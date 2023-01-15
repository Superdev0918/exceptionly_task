import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { DataSource, Repository } from 'typeorm'
import { AuthenticateUserDTO, CreateUserDTO, UpdateUserDTO } from './user.DTO'
import { compare, genSalt, hash } from 'bcrypt'
import User from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.userRepository.find()
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id: id })
  }

  async create(createUserDTO: CreateUserDTO) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      if (
        await queryRunner.manager.findOneBy(User, {
          username: createUserDTO.username,
        })
      ) {
        throw new BadRequestException('Already Exist User')
      }
      const user = queryRunner.manager.create(User, createUserDTO)
      await queryRunner.manager.save(user)
      await queryRunner.commitTransaction()
      return user
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async delete(id: number) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      if (await queryRunner.manager.findOneBy(User, { id: id })) {
        await queryRunner.manager.delete(User, { id: id })
        await queryRunner.commitTransaction()
        return 'Delete Success'
      } else {
        throw new BadRequestException('Unknown User')
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      if (await queryRunner.manager.findOneBy(User, { id: id })) {
        if (updateUserDTO.password) {
          const salt = await genSalt(10)
          updateUserDTO.password = await hash(updateUserDTO.password, salt)
        }
        await queryRunner.manager.update(User, { id: id }, updateUserDTO)
        await queryRunner.commitTransaction()
        return 'Update Success'
      } else {
        throw new BadRequestException('Unknown User.')
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async authenticate(authenticateUserDTO: AuthenticateUserDTO) {
    const user = await this.userRepository.findOneBy({
      username: authenticateUserDTO.username,
    })
    if (user && (await compare(authenticateUserDTO.password, user.password))) {
      const accessToken = this.jwtService.sign({ id: user.id })
      return accessToken
    } else {
      throw new UnauthorizedException('Login Fail')
    }
  }
}
