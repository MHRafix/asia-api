import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  post: string;

  @Field(() => String)
  @IsNotEmpty()
  avatar: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  salary: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}
