import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  avatar: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  updatedAt: Date;
}
