import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Visa_Types } from './../../blog/entities/blog.entity';

export type TaskManagementDocument = TaskManagement & Document;

export enum Task_Type {
  INDIAN_VISA = 'INDIAN_VISA',
  THAI_VISA = 'THAI_VISA',
  KSA_VISA = 'KSA_VISA',
  UAE_VISA = 'UAE_VISA',
  OTHERS = 'OTHERS',
}

registerEnumType(Task_Type, {
  name: 'Task_Type',
});

export enum Task_Progress_Status {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  DONE_INFORMED = 'DONE_INFORMED',
  Delivered = 'DELIVERED',
  Rejected = 'REJECTED',
}

registerEnumType(Task_Progress_Status, {
  name: 'Task_Progress_Status',
});

export enum Payment_Status {
  REFUNDED = 'REFUNDED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  DUE = 'DUE',
  REJECTED = 'REJECTED',
}

registerEnumType(Payment_Status, {
  name: 'Payment_Status',
});

@ObjectType()
export class TaskManagement_ClientDetails {
  @Prop()
  @Field(() => String)
  clientName: string;

  @Prop()
  @Field(() => String, { nullable: true })
  clientEmail: string;

  @Prop()
  @Field(() => String)
  clientPhone: string;

  @Prop()
  @Field(() => String, { nullable: true })
  clientAddress: string;
}

@ObjectType()
export class TaskManagement_TaskDetails {
  @Prop()
  @Field(() => String)
  taskName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  taskAssignTo: string;

  @Prop()
  @Field(() => String, { nullable: true })
  taskDescription: string;

  @Prop()
  @Field(() => String, { nullable: true })
  country: string;

  @Prop()
  @Field(() => Task_Type)
  taskType: Task_Type;

  @Prop()
  @Field(() => Visa_Types)
  visaType: Visa_Types;
}

@Schema({ timestamps: true })
@ObjectType()
export class TaskManagement {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  taskCreateBy: string;

  @Prop()
  @Field(() => TaskManagement_ClientDetails)
  clientDetails: TaskManagement_ClientDetails;

  @Prop()
  @Field(() => TaskManagement_TaskDetails)
  taskDetails: TaskManagement_TaskDetails;

  @Prop()
  @Field(() => String)
  taskId: string;

  @Prop()
  @Field(() => Int)
  totalBillAmount: number;

  @Prop()
  @Field(() => Int)
  paidBillAmount: number;

  @Prop({ default: Task_Progress_Status.PENDING })
  @Field(() => Task_Progress_Status, {
    defaultValue: Task_Progress_Status.PENDING,
    nullable: true,
  })
  progressStatus: Task_Progress_Status;

  @Prop({ default: Payment_Status.DUE })
  @Field(() => Payment_Status, {
    defaultValue: Payment_Status.DUE,
  })
  paymentStatus: Payment_Status;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const TaskManagementSchema =
  SchemaFactory.createForClass(TaskManagement);

@ObjectType()
export class TaskManagementPagination extends Paginated(TaskManagement) {}
