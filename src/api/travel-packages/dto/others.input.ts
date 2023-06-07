import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class RatingsAndReviewsInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  rating: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  message: string;
}

@InputType()
export class TravelersInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  travelerEmail: string;
}

@InputType()
export class CountDownTimerInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  bookingStart: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  bookingEnd: Date;
}
