import { Field, ID, ObjectType } from '@nestjs/graphql'
import { genSalt, hash } from 'bcrypt'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field(() => String)
  @Column()
  firstName: string

  @Field(() => String)
  @Column()
  lastName: string

  @Field(() => String)
  @Column()
  email: string

  @Field(() => String)
  @Column()
  password: string

  @Field(() => String)
  @Column()
  provider: string

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
  }
}

export default User
