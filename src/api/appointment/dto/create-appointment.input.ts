import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  subject: string;

  @Field(() => String)
  @IsNotEmpty()
  serviceId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  note: string;
}
