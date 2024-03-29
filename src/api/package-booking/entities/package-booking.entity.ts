import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import {
  BOOKING_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '../enums/booking-status.enum';
import { TravelPackage } from '../../travel-packages/entities/travel-package.entity';

export type PackageBookingDocument = PackageBooking & Document;

// @ObjectType()
// @Schema()
// export class CustomerDetailsSchema {
//   @Prop()
//   @Field(() => String)
//   name: string;

//   @Prop()
//   @Field(() => String)
//   email: string;

//   @Prop()
//   @Field(() => String)
//   phone: string;

//   @Prop()
//   @Field(() => String)
//   address: string;
// }

@ObjectType()
@Schema()
export class TravelerDetailsSchema {
  @Prop()
  @Field(() => Number)
  adult: number;

  @Prop()
  @Field(() => Number)
  child: number;
}

@ObjectType()
@Schema()
export class PaymentDetailsSchema {
  @Prop({ default: PAYMENT_STATUS.DUE })
  @Field(() => PAYMENT_STATUS, {
    nullable: true,
    defaultValue: PAYMENT_STATUS.DUE,
  })
  paymentStatus: PAYMENT_STATUS;

  @Prop()
  @Field(() => Number)
  totalAmount: number;

  @Prop()
  @Field(() => String, { nullable: true })
  paidFrom: string;

  @Prop()
  @Field(() => PAYMENT_METHOD, {
    nullable: true,
    defaultValue: PAYMENT_METHOD.NONE,
  })
  paymentMethod: PAYMENT_METHOD;

  @Prop()
  @Field(() => Date, { nullable: true })
  paymentDateTime: Date;
}

@ObjectType()
@Schema({ timestamps: true })
export class PackageBooking {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User, { nullable: true })
  customerDetails: string;

  @Prop()
  @Field(() => TravelerDetailsSchema)
  travelerDetails: TravelerDetailsSchema;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TravelPackage.name })
  @Field(() => TravelPackage, { nullable: true })
  packageId: TravelPackage;

  @Prop()
  @Field(() => String, { nullable: true })
  transactionId: string;

  @Prop()
  @Field(() => String)
  bookingId: string;

  @Prop({ default: BOOKING_STATUS.PENDING })
  @Field(() => BOOKING_STATUS, { defaultValue: BOOKING_STATUS.PENDING })
  status: BOOKING_STATUS;

  @Prop()
  @Field(() => PaymentDetailsSchema, { nullable: true })
  paymentDetails: PaymentDetailsSchema;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const PackageBookingSchema =
  SchemaFactory.createForClass(PackageBooking);

@ObjectType()
export class PackageBookingPagination extends Paginated(PackageBooking) {}
