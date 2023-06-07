import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class DeparturePlaceInfo {
  @Prop()
  @Field(() => String, { nullable: true })
  departureFrom: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  lat: number;

  @Prop()
  @Field(() => Number, { nullable: true })
  lng: number;
}

@ObjectType()
@Schema()
export class DestinationPlaceInfo {
  @Prop()
  @Field(() => String, { nullable: true })
  destination: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  lat: number;

  @Prop()
  @Field(() => Number, { nullable: true })
  lng: number;
}
