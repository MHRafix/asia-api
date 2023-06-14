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
  thumbnail: string;

  @Field(() => String)
  @IsNotEmpty()
  banner: string;

  @Field(() => String)
  @IsNotEmpty()
  shortDesc: string;

  @Field(() => String)
  @IsNotEmpty()
  desc: string;

  @Field(() => String)
  @IsNotEmpty()
  country: string;

  @Field(() => String)
  @IsNotEmpty()
  visaCategory: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  preRequirements: string;

  @Field(() => Number, { nullable: true })
  @IsNotEmpty()
  price: number;

  // @Field(() => Boolean, { nullable: true })
  // @IsOptional()
  // isCustomizable: boolean;
}
