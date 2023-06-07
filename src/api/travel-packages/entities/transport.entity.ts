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
  @Field(() => String, { nullable: true })
  startAt: string;

  @Prop()
  @Field(() => String, { nullable: true })
  transportName: string;

  @Prop()
  @Field(() => String, { nullable: true })
  departureFrom: string;

  @Prop()
  @Field(() => String, { nullable: true })
  destination: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  stops: number;

  @Prop()
  @Field(() => String, { nullable: true })
  journeyBreak: string;

  @Prop()
  @Field(() => String, { nullable: true })
  endAt: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  transportDate: Date;
}
