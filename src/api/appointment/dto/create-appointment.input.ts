import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { APPOINTMENT_STATUS } from '../entities/appointment.entity';

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

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  service: string;

  @Field(() => APPOINTMENT_STATUS, {
    defaultValue: APPOINTMENT_STATUS.PENDING,
  })
  @IsNotEmpty()
  status: APPOINTMENT_STATUS;

  @Field(() => String)
  @IsNotEmpty()
  subService: string;

  @Field(() => String)
  @IsNotEmpty()
  profession: string;

  @Field(() => [ClientQuestionsInput], { nullable: true })
  @IsOptional()
  clientQuestions: ClientQuestionsInput[];

  @Field(() => Date, { nullable: true })
  @IsOptional()
  createdAt: Date;
}
