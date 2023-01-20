import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { DataSource, Repository } from 'typeorm'
import { CreateBookDTO } from './book.DTO'
import Book from './book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly userRepository: Repository<Book>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  findByUserId(userId: string) {
    return this.userRepository.findBy({ userId: userId })
  }

  async create(createBookDTO: CreateBookDTO) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
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
}
