import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ClientQuestionsInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  qTitle: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  qDesc: string;
}

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
  serviceId: string;

  @Field(() => String)
  @IsNotEmpty()
  subService: string;

  @Field(() => String)
  @IsNotEmpty()
  profession: string;

  @Field(() => [ClientQuestionsInput], { nullable: true })
  @IsOptional()
  clientQuestions: ClientQuestionsInput[];
}
