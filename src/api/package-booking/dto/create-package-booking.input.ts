import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import {
  BOOKING_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '../enums/booking-status.enum';

@InputType()
export class PaymentDetailsInput {
  @Field(() => PAYMENT_STATUS, { defaultValue: PAYMENT_STATUS.DUE })
  @IsNotEmpty()
  paymentStatus: PAYMENT_STATUS;

  @Field(() => Number)
  @IsNotEmpty()
  totalAmount: number;

  @Field(() => PAYMENT_METHOD, {
    nullable: true,
    defaultValue: PAYMENT_METHOD.NONE,
  })
  @IsOptional()
  paymentMethod: PAYMENT_METHOD;

  @Field(() => String, { nullable: true })
  @IsOptional()
  paidFrom: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  paymentDateTime: Date;
}

// @InputType()
// export class CustomerDetailsInput {
//   @Field(() => String)
//   @IsNotEmpty()
//   name: string;

//   @Field(() => String)
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @Field(() => String)
//   @IsNotEmpty()
//   phone: string;

//   @Field(() => String)
//   @IsNotEmpty()
//   address: string;
// }

@InputType()
export class TravelerDetailsInput {
  @Field(() => Number)
  @IsNotEmpty()
  adult: number;

  @Field(() => Number)
  @IsNotEmpty()
  child: number;
}

@InputType()
export class CreatePackageBookingInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  customerDetails: string;

  @Field(() => TravelerDetailsInput)
  @IsNotEmpty()
  travelerDetails: TravelerDetailsInput;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  packageId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  transactionId: string;

  @Field(() => String)
  @IsNotEmpty()
  bookingId: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  createdAt: Date;

  @Field(() => BOOKING_STATUS, { defaultValue: BOOKING_STATUS.PENDING })
  @IsNotEmpty()
  status: BOOKING_STATUS;

  @Field(() => PaymentDetailsInput, { nullable: true })
  @IsOptional()
  paymentDetails: PaymentDetailsInput;
}
