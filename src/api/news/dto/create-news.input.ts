import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class NewsTagsInput {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags: string[];
}

@InputType()
export class CreateNewsInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  category: string;

  @Field(() => NewsTagsInput, { nullable: true })
  @IsOptional()
  relatedInfo: NewsTagsInput;

  @Field(() => String)
  @IsNotEmpty()
  videoUrl: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  publishedAt: Date;
}
