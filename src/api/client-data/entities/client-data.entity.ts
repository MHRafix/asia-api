import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClientDataDocument = ClientData & Document;

@ObjectType()
@Schema({ timestamps: true })
export class ClientData {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  address: string;

  @Prop()
  @Field(() => String, { nullable: true })
  email: string;

  @Prop()
  @Field(() => String, { nullable: true })
  phone: string;
}

export const ClientDataSchema = SchemaFactory.createForClass(ClientData);

@ObjectType()
export class ClientDataPagination extends Paginated(ClientData) {}
