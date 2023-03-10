import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Appointment {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ required: true })
  @Field(() => String)
  name: string;

  @Prop({ required: true })
  @Field(() => String)
  email: string;

  @Prop({ required: true })
  @Field(() => String)
  phone: string;

  @Prop({ required: true })
  @Field(() => String)
  subject: string;

  @Prop({ required: true })
  @Field(() => String)
  serviceId: string;

  @Prop({ required: true })
  @Field(() => String, { nullable: true })
  note: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

@ObjectType()
export class AppointmentPagination extends Paginated(Appointment) {}
