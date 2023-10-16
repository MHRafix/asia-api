import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Visa_Types } from '../../blog/entities/blog.entity';
import { User } from '../../users/entities/user.entity';

export type VisaReqDocument = VisaReq & Document;

export enum VisaReq_Status {
  PUBLISHED = 'PUBLISHED',
  PAUSED = 'PAUSED',
  ARCHIVE = 'ARCHIVE',
}

registerEnumType(VisaReq_Status, {
  name: 'VisaReq_Status',
});

export enum Visa_Types2 {
  TOURIST = 'TOURIST',
  WORK_PERMIT = 'WORK_PERMIT',
  MEDICAL = 'MEDICAL',
  BUSINESS = 'BUSINESS',
}

registerEnumType(Visa_Types2, {
  name: 'Visa_Types2',
});

@ObjectType()
@Schema({ timestamps: true })
export class VisaReq {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  author: string;

  @Prop({ default: VisaReq_Status.PUBLISHED })
  @Field(() => VisaReq_Status, {
    defaultValue: VisaReq_Status.PUBLISHED,
    nullable: true,
  })
  status: VisaReq_Status;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => String, { nullable: true })
  country: string;

  @Prop()
  @Field(() => String, { nullable: true })
  image: string;

  @Prop()
  @Field(() => String, { nullable: true })
  cover: string;

  @Prop({ default: Visa_Types.TOURIST })
  @Field(() => Visa_Types, {
    defaultValue: Visa_Types.TOURIST,
    nullable: true,
  })
  visaType: Visa_Types;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const VisaReqSchema = SchemaFactory.createForClass(VisaReq);

@ObjectType()
export class VisaReqPagination extends Paginated(VisaReq) {}
