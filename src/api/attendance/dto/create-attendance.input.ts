import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Attendance_Status } from '../entities/attendance.entity';

@InputType()
export class CreateAttendanceInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => Attendance_Status, {
    defaultValue: Attendance_Status.PENDING,
    nullable: true,
  })
  @IsOptional()
  status: Attendance_Status;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  attendee: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  verifyBy: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  note: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  date: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}