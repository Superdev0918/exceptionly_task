import { Field, ID, ObjectType } from '@nestjs/graphql'
import { genSalt, hash } from 'bcrypt'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
class Book {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field(() => String)
  @Column()
  userId: string

  @Field(() => String)
  @Column()
  date: string

  @Field(() => String)
  @Column()
  taskId: string

  @Field(() => String)
  @Column()
  task: string

  @Field(() => String)
  @Column()
  weekRow: string
}

export default Book
