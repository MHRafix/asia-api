import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  CUSTOMER = 'CUSTOMER',
}

export enum PAYMENT_TYPE {
  ONLINE = 'ONLINE',
  BANK = 'BANK',
}

registerEnumType(USER_ROLE, {
  name: 'USER_ROLE',
});

registerEnumType(PAYMENT_TYPE, {
  name: 'PAYMENT_TYPE',
});

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ required: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Prop({ required: true })
  @Field(() => String, { nullable: true })
  email: string;

  @Prop({ default: USER_ROLE.CUSTOMER })
  @Field(() => USER_ROLE, { defaultValue: USER_ROLE.CUSTOMER })
  role: USER_ROLE;

  @Prop({ required: true, nullable: true })
  @Field(() => String)
  password: string;

  @Prop({
    required: false,
    default: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
  })
  @Field(() => String, { nullable: true })
  avatar: string;

  // @Prop({ required: false })
  // @Field(() => [BookingPaymentInformation], { nullable: true })
  // bookingAndPaymentInfo: BookingPaymentInformation[];
}

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserPagination extends Paginated(User) {}

// @ObjectType()
// @Schema({ timestamps: true })
// export class BookingPaymentInformation {
//   @Field(() => ID)
//   _id: string;

//   @Prop({ default: PAYMENT_TYPE.ONLINE })
//   @Field(() => PAYMENT_TYPE, { defaultValue: PAYMENT_TYPE.ONLINE })
//   type: PAYMENT_TYPE;

//   @Prop()
//   @Field(() => String, { nullable: true })
//   serviceName: string;

//   // @Prop({
//   //   type: MongooseSchema.Types.ObjectId,
//   //   // ref: Service.name
//   // })
//   // @Field(() => 'Service')
//   // serviceId: string;

//   @Prop()
//   @Field(() => Number, { nullable: true })
//   amount: number;

//   @Prop()
//   @Field(() => String, { nullable: true })
//   providerName: string;
// }
