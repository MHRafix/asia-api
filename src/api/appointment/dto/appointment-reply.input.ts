import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ReplyAppointmentInput {
  @Field(() => String)
  @IsNotEmpty()
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => [QuestionsAnswers])
  @IsNotEmpty()
  @IsArray()
  payload: QuestionsAnswers[];
}

@InputType()
export class QuestionsAnswers {
  @Field(() => String)
  @IsNotEmpty()
  question: string;

  @Field(() => String)
  @IsNotEmpty()
  answer: string;
}
