import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Blog_Status, Visa_Types } from '../entities/blog.entity';

@InputType()
export class CreateBlogInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => Blog_Status, {
    defaultValue: Blog_Status.PUBLISHED,
    nullable: true,
  })
  @IsOptional()
  status: Blog_Status;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  author: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  date: Date;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  like: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  image: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cover: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
