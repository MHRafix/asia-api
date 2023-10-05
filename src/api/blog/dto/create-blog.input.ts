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

  @Field(() => String)
  @IsNotEmpty()
  country: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  image: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cover: string;

  @Field(() => Visa_Types, {
    defaultValue: Visa_Types.TOURIST,
    nullable: true,
  })
  @IsOptional()
  visaType: Visa_Types;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
