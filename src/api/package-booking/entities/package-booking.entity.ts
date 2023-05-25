import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PackageBookingDocument = PackageBooking & Document;

export enum BOOKING_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum PAYMENT_STATUS {
  DUE = 'DUE',
  PAID = 'PAID',
}

export enum PAYMENT_METHOD {
  ONLINE = 'ONLINE',
  BANK = 'BANK',
  NONE = 'NONE',
}

registerEnumType(PAYMENT_METHOD, {
  name: 'PAYMENT_METHOD',
});

registerEnumType(BOOKING_STATUS, {
  name: 'BOOKING_STATUS',
});

registerEnumType(PAYMENT_STATUS, {
  name: 'PAYMENT_STATUS',
});

@ObjectType()
@Schema()
export class CustomerDetailsSchema {
  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String)
  phone: string;

  @Prop()
  @Field(() => String)
  address: string;
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
  @Field(() => PAYMENT_METHOD, {
    nullable: true,
    defaultValue: PAYMENT_METHOD.NONE,
  })
  paymentMethod: PAYMENT_METHOD;

  @Prop()
  @Field(() => String, {
    nullable: true,
  })
  paidToNumber: string;

  @Prop()
  @Field(() => String, { nullable: true })
  transactionId: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  paymentDateTime: Date;
}

@ObjectType()
@Schema({ timestamps: true })
export class PackageBooking {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => CustomerDetailsSchema)
  customerDetails: CustomerDetailsSchema;

  @Prop()
  @Field(() => String)
  packageId: string;

  @Prop({ default: BOOKING_STATUS.PENDING })
  @Field(() => BOOKING_STATUS, { defaultValue: BOOKING_STATUS.PENDING })
  status: BOOKING_STATUS;

  @Prop()
  @Field(() => PaymentDetailsSchema, { nullable: true })
  paymentDetails: PaymentDetailsSchema;
}

export const PackageBookingSchema =
  SchemaFactory.createForClass(PackageBooking);

@ObjectType()
export class PackageBookingPagination extends Paginated(PackageBooking) {}
