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

  @Field(() => String, { nullable: true })
  @IsOptional()
  facebook: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  linkedin: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}
