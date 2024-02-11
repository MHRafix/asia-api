import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PAYMENT_METHOD } from '../../package-booking/enums/booking-status.enum';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';

export type MoneyReceiptDocument = MoneyReceipt & Document;

@ObjectType()
@Schema({ timestamps: true })
export class MoneyReceipt {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  clientName: string;

  @Prop()
  @Field(() => String, { nullable: true })
  address: string;

  @Prop()
  @Field(() => String, { nullable: true })
  email: string;

  @Prop()
  @Field(() => String, { nullable: true })
  contactNumber: string;

  @Prop()
  @Field(() => String, { nullable: true })
  passportNo: string;

  @Prop()
  @Field(() => PAYMENT_METHOD, { nullable: true })
  paymentType: PAYMENT_METHOD;

  @Prop()
  @Field(() => String, { nullable: true })
  amountInWords: string;

  @Prop()
  @Field(() => Int, { nullable: true })
  amountInNumber: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Service.name })
  @Field(() => Service, { nullable: true })
  service: string;

  @Prop()
  @Field(() => Int, { nullable: true })
  serialNo: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  mrNo: number;

  @Prop({
    default: 1,
  })
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  quantity: number;

  @Prop()
  @Field(() => Date, { nullable: true })
  issueDate: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  deliveryDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  authorizeBy: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const MoneyReceiptSchema = SchemaFactory.createForClass(MoneyReceipt);

@ObjectType()
export class MoneyReceiptPagination extends Paginated(MoneyReceipt) {}
