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
@Schema({ timestamps: true })
export class PackageBooking {
  @Field(() => ID, { nullable: true })
  _id: string;

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
  street: string;

  @Prop()
  @Field(() => String)
  city: string;

  @Prop()
  @Field(() => String)
  country: string;

  @Prop()
  @Field(() => String)
  packageId: string;

  @Prop({ default: BOOKING_STATUS.PENDING })
  @Field(() => BOOKING_STATUS, { defaultValue: BOOKING_STATUS.PENDING })
  status: BOOKING_STATUS;

  @Prop({ default: PAYMENT_STATUS.DUE })
  @Field(() => PAYMENT_STATUS, { defaultValue: PAYMENT_STATUS.DUE })
  paymentStatus: PAYMENT_STATUS;

  @Prop()
  @Field(() => PAYMENT_METHOD, { nullable: true })
  paymentMethod: PAYMENT_METHOD;

  @Prop()
  @Field(() => String, { nullable: true })
  transactionId: string;

  @Prop()
  @Field(() => Number)
  amount: number;

  @Prop({ default: Date.now() })
  @Field(() => Date, { defaultValue: Date.now() })
  paymentDateTime: Date;
}

export const PackageBookingSchema =
  SchemaFactory.createForClass(PackageBooking);

@ObjectType()
export class PackageBookingPagination extends Paginated(PackageBooking) {}
