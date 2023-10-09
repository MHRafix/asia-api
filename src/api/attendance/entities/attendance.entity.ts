import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type AttendanceDocument = Attendance & Document;

export enum Attendance_Status {
  VERIFIED = 'VERIFIED',
  PENDING = 'PENDING',
  NOT_PRESENT = 'NOT_PRESENT',
}

registerEnumType(Attendance_Status, {
  name: 'Attendance_Status',
});

@ObjectType()
@Schema({ timestamps: true })
export class Attendance {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  verifyBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  attendee: string;

  @Prop({ default: Attendance_Status.PENDING })
  @Field(() => Attendance_Status, {
    defaultValue: Attendance_Status.PENDING,
    nullable: true,
  })
  status: Attendance_Status;

  @Prop()
  @Field(() => Date, { nullable: true })
  date: Date;

  @Prop()
  @Field(() => String, { nullable: true })
  note: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

@ObjectType()
export class AttendancePagination extends Paginated(Attendance) {}
