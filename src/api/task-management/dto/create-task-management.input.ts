import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Visa_Types } from '../../blog/entities/blog.entity';
import {
  Payment_Status,
  Task_Progress_Status,
  Task_Type,
} from '../entities/task-management.entity';

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
  country: string;

  @Field(() => Task_Type)
  @IsNotEmpty()
  @IsEnum(Task_Type)
  taskType: Task_Type;

  @Field(() => Visa_Types)
  @IsNotEmpty()
  @IsEnum(Visa_Types)
  visaType: Visa_Types;
}

@InputType()
export class CreateTaskManagementInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsOptional()
  @IsMongoId()
  taskCreateBy: string;

  @Field(() => ClientDetails)
  @IsNotEmpty()
  // @ValidateNested()
  clientDetails: ClientDetails;

  @Field(() => TaskDetails)
  @IsNotEmpty()
  // @ValidateNested()
  taskDetails: TaskDetails;

  @Field(() => String)
  @IsNotEmpty()
  taskId: string;

  @Field(() => Int)
  @IsNotEmpty()
  totalBillAmount: number;

  @Field(() => Int)
  @IsNotEmpty()
  paidBillAmount: number;

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

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
