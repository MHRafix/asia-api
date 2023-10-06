import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type ServiceDocument = Service & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Service {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String, { nullable: true })
  thumbnail: string;

  @Prop()
  @Field(() => String, { nullable: true })
  banner: string;

  @Prop()
  @Field(() => String)
  shortDesc: string;

  @Prop()
  @Field(() => String)
  desc: string;

  @Prop()
  @Field(() => String, { nullable: true })
  preRequirements: string;

  @Prop()
  @Field(() => String, { nullable: true })
  country: string;

  @Prop()
  @Field(() => String, { nullable: true })
  visaCategory: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User, { nullable: true })
  author: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

@ObjectType()
export class ServicePagination extends Paginated(Service) {}
