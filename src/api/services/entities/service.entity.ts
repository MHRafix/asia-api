import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  @Field(() => String)
  thumbnail: string;

  @Prop()
  @Field(() => String)
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
  @Field(() => String)
  country: string;

  @Prop()
  @Field(() => String)
  visaCategory: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  price: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

@ObjectType()
export class ServicePagination extends Paginated(Service) {}
