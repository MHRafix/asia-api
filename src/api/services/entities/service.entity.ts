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
  public title: string;

  @Prop()
  @Field(() => String)
  public shortDesc: string;

  @Prop()
  @Field(() => String)
  public desc: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public preRequirements: string;

  @Prop()
  @Field(() => Number)
  public price: number;

  @Prop()
  @Field(() => Boolean, { nullable: true })
  public isCustomizeable: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

@ObjectType()
export class ServicePagination extends Paginated(Service) {}
