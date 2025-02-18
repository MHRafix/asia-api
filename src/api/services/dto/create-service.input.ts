import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  thumbnail: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  banner: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  shortDesc: string;

  @Field(() => String)
  @IsNotEmpty()
  desc: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  author: string;
}
