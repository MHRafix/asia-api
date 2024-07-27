import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class SocialInfo {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public facebook: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public linkedin: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public phone: string;
}

@InputType()
export class CreateClientDataInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  address: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}
