import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import { MinLength, MaxLength, Matches } from 'class-validator'

@InputType()
class BookDTO {
  @MinLength(1)
  @MaxLength(20)
  @Field()
  userId: string

  @MinLength(2)
  @MaxLength(20)
  @Field()
  date: string

  @MinLength(2)
  @MaxLength(30)
  @Field()
  taskId: string

  @MinLength(2)
  @MaxLength(20)
  @Field()
  task: string

  @MinLength(1)
  @MaxLength(20)
  @Field()
  weekRow: string
}

@InputType()
class CreateBookDTO extends BookDTO {}

export { CreateBookDTO }
