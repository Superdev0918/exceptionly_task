import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { DataSource, Repository } from 'typeorm'
import { CreateBookDTO, UpdateBookDTO } from './book.DTO'
import Book from './book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly userRepository: Repository<Book>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  findByUserId(userId: string) {
    const decode: any = this.jwtService.decode(userId)
    return this.userRepository.findBy({ userId: decode.id })
  }

  async create(createBookDTO: CreateBookDTO) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const decode: any = this.jwtService.decode(createBookDTO.userId)
    createBookDTO.userId = decode.id
    try {
      const book = queryRunner.manager.create(Book, createBookDTO)
      await queryRunner.manager.save(book)
      await queryRunner.commitTransaction()
      return book
    } catch (error) {
      console.log('error: ', error)
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async update(taskId: string, updateBookDTO: UpdateBookDTO) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      if (await queryRunner.manager.findOneBy(Book, { taskId: taskId })) {
        await queryRunner.manager.update(
          Book,
          { taskId: taskId },
          updateBookDTO,
        )
        await queryRunner.commitTransaction()
        return 'Update Success'
      } else {
        throw new BadRequestException('Unknown Booking.')
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }
}
