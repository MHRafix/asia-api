import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BOOKING_STATUS } from '../../package-booking/enums/booking-status.enum';

export type AppointmentDocument = Appointment & Document;

@ObjectType()
@Schema()
export class ClientQuestionsSchema {
  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  qTitle: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  qDesc: string;
}

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
  serviceId: string;

  @Prop({ required: true })
  @Field(() => BOOKING_STATUS)
  status: BOOKING_STATUS;

  @Prop({ required: true })
  @Field(() => String)
  subService: string;

  @Prop({ required: true })
  @Field(() => String)
  profession: string;

  @Prop({
    required: false,
  })
  @Field(() => [ClientQuestionsSchema], { nullable: true })
  clientQuestions: ClientQuestionsSchema[];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

@ObjectType()
export class AppointmentPagination extends Paginated(Appointment) {}
