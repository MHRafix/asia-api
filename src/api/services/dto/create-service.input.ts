import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  shortDesc: string;

  @Field(() => String)
  @IsNotEmpty()
  desc: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  preRequirements: string;

  @Field(() => Number)
  @IsNotEmpty()
  price: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  meetTime: string;
}
