import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import { MinLength, MaxLength, Matches } from 'class-validator'

@InputType()
class UserDTO {
  @MinLength(2)
  @MaxLength(20)
  @Field()
  firstName: string

  @MinLength(2)
  @MaxLength(20)
  @Field()
  lastName: string

  @MinLength(2)
  @MaxLength(30)
  @Field()
  email: string

  @MinLength(2)
  @MaxLength(20)
  // @Matches(/^[a-zA-Z0-9]*$/)
  @Field()
  password: string
}

@InputType()
class CreateUserDTO extends UserDTO {}

@InputType()
class UpdateUserDTO extends PartialType(UserDTO) {}

@InputType()
class AuthenticateUserDTO extends PickType(UserDTO, [
  'email',
  'password',
] as const) {}

export { CreateUserDTO, UpdateUserDTO, AuthenticateUserDTO }
