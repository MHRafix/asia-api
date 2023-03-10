import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {
  BOOKING_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '../entities/package-booking.entity';

@InputType()
export class CreatePackageBookingInput {
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
  street: string;

  @Field(() => String)
  @IsNotEmpty()
  city: string;

  @Field(() => String)
  @IsNotEmpty()
  country: string;

  @Field(() => String)
  @IsNotEmpty()
  packageId: string;

  @Field(() => BOOKING_STATUS, { defaultValue: BOOKING_STATUS.PENDING })
  @IsNotEmpty()
  status: BOOKING_STATUS;

  @Field(() => PAYMENT_STATUS, { defaultValue: PAYMENT_STATUS.DUE })
  @IsNotEmpty()
  paymentStatus: PAYMENT_STATUS;

  @Field(() => PAYMENT_METHOD, { nullable: true })
  @IsNotEmpty()
  paymentMethod: PAYMENT_METHOD;

  @Field(() => String, { nullable: true })
  @IsOptional()
  transactionId: string;

  @Field(() => Number)
  @IsNotEmpty()
  amount: number;

  @Field(() => Date, { defaultValue: Date.now() })
  @IsNotEmpty()
  paymentDateTime: Date;
}
