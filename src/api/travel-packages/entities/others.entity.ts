import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class RatingsAndReviews {
  @Prop()
  @Field(() => Number, { nullable: true })
  rating: number;

  @Prop()
  @Field(() => String, { nullable: true })
  email: string;

  @Prop()
  @Field(() => String, { nullable: true })
  message: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Travelers {
  @Prop({
    required: false,
  })
  @Field(() => String, { nullable: true })
  travelerEmail: string;
}

@ObjectType()
@Schema()
export class CountDownTimer {
  @Prop()
  @Field(() => Date, { nullable: true })
  bookingStart: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  bookingEnd: Date;
}

@ObjectType()
@Schema()
export class CarouselThumbnailsSchema {
  @Prop()
  @Field(() => [String], { nullable: true })
  thumbnail: string[];
}
