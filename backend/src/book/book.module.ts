import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { BookResolver } from './book.resolver'
import Book from './book.entity'
// import JWTStrategy from './user.JWT'

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: 3600 },
      }),
    }),
  ],
  providers: [BookService, BookResolver],
})
export class BookModule {}
