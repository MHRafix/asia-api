import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import {
  Payment_Status,
  Task_Progress_Status,
} from '../entities/task-management.entity';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class ClientDetails {
  @Field(() => String)
  @IsNotEmpty()
  clientName: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  clientEmail: string;

  @Field(() => String)
  @IsNotEmpty()
  clientPhone: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  clientAddress: string;
}

@InputType()
export class ServerFileReferenceInput {
  @Field(() => String)
  @IsNotEmpty()
  fileUrl: string;
}

@InputType()
export class TaskDetails {
  @Field(() => String)
  @IsNotEmpty()
  taskName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  taskAssignTo: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  taskDescription: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  issuesDescription: string;
}

@InputType()
export class CreateTaskManagementInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsOptional()
  @IsMongoId()
  taskCreatedBy: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  client: string;

  @Field(() => TaskDetails)
  @IsNotEmpty()
  taskDetails: TaskDetails;

  @Field(() => String)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ServerFileReferenceInput, { nullable: true })
  @IsOptional()
  files: ServerFileReferenceInput;

  @Field(() => Int)
  @IsNotEmpty()
  totalBillAmount: number;

  @Field(() => Int)
  @IsNotEmpty()
  paidBillAmount: number;

  @Field(() => Int)
  @IsNotEmpty()
  dueAmount: number;

  @Field(() => Task_Progress_Status, {
    defaultValue: Task_Progress_Status.PENDING,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(Task_Progress_Status)
  progressStatus: Task_Progress_Status;

  @Field(() => Payment_Status, {
    defaultValue: Payment_Status.DUE,
  })
  @IsOptional()
  @IsEnum(Payment_Status)
  paymentStatus: Payment_Status;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  deadLine: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
