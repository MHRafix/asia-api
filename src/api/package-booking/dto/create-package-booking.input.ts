import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {
  BOOKING_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '../entities/package-booking.entity';

@InputType()
export class PaymentDetailsInput {
  @Field(() => PAYMENT_STATUS, { defaultValue: PAYMENT_STATUS.DUE })
  @IsNotEmpty()
  paymentStatus: PAYMENT_STATUS;

  @Field(() => PAYMENT_METHOD, {
    nullable: true,
    defaultValue: PAYMENT_METHOD.NONE,
  })
  @IsOptional()
  paymentMethod: PAYMENT_METHOD;

  @Field(() => String, { nullable: true })
  @IsOptional()
  transactionId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  paidToNumber: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  paymentDateTime: Date;
}

@InputType()
export class CustomerDetailsInput {
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
  address: string;
}

@InputType()
export class CreatePackageBookingInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => CustomerDetailsInput)
  @IsNotEmpty()
  customerDetails: CustomerDetailsInput;

  @Field(() => String)
  @IsNotEmpty()
  packageId: string;

  @Field(() => BOOKING_STATUS, { defaultValue: BOOKING_STATUS.PENDING })
  @IsNotEmpty()
  status: BOOKING_STATUS;

  @Field(() => PaymentDetailsInput)
  @IsOptional()
  paymentDetails: PaymentDetailsInput;
}
