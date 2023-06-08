import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class PlaceInfoSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  lat: string;

  @Prop()
  @Field(() => String, { nullable: true })
  lng: string;
}
