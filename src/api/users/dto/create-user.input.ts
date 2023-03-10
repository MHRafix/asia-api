import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { USER_ROLE } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String, { description: 'User name' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => USER_ROLE, { description: 'User role', nullable: true })
  @IsNotEmpty()
  role: USER_ROLE;

  @Field(() => String, { description: 'User password', nullable: true })
  @IsOptional()
  password: string;

  @Field(() => String, { description: 'User avatar', nullable: true })
  @IsOptional()
  avatar: string;
}
