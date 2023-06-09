import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

export enum TOURBY {
  BY_AIR = 'BY_AIR',
  BY_ROAD = 'BY_ROAD',
  BY_RAIL = 'BY_RAIL',
}

registerEnumType(TOURBY, {
  name: 'TOURBY',
});

@ObjectType()
@Schema()
export class Transportation {
  @Prop({ default: TOURBY?.BY_ROAD })
  @Field(() => TOURBY, { defaultValue: TOURBY.BY_ROAD })
  tourBy: TOURBY;

  @Prop()
  @Field(() => Date, { nullable: true })
  departureDate: Date;

  @Prop()
  @Field(() => String, { nullable: true })
  departureTime: string;

  @Prop()
  @Field(() => String, { nullable: true })
  transportName: string;

  @Prop()
  @Field(() => String, { nullable: true })
  departureStation: string;

  @Prop()
  @Field(() => String, { nullable: true })
  destinationStation: string;

  @Prop()
  @Field(() => String, { nullable: true })
  stops: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  journeyBreak: number;

  @Prop()
  @Field(() => String, { nullable: true })
  arrivalTime: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  arrivalDate: Date;
}
