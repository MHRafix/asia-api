import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import {
  PACKAGE_STATUS,
  SALE_STATUS,
  TOURBY,
} from '../entities/travel-package.entity';

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
export class TransportationInput {
  @Field(() => TOURBY, { defaultValue: TOURBY.BY_ROAD })
  @IsOptional()
  tourBy: TOURBY;

  @Field(() => String, { nullable: true })
  @IsOptional()
  departureFrom: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  destination: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  startAt: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  transportName: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  stops: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  journeyBreak: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  endAt: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  transportDate: Date;
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

@InputType()
export class DeparturePlaceInfoInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  departureFrom: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  lat: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  lng: number;
}

@InputType()
export class DestinationPlaceInfoInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  destination: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  lat: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  lng: number;
}

@InputType()
export class CreateTravelPackageInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsOptional()
  packageTitle: string;

  @Field(() => Number)
  @IsNotEmpty()
  regularPrice: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  salePrice: number;

  @Field(() => SALE_STATUS, { defaultValue: SALE_STATUS.FIXED, nullable: true })
  @IsNotEmpty()
  saleStatus: SALE_STATUS;

  @Field(() => Boolean)
  @IsNotEmpty()
  isPublished: boolean;

  @Field(() => CountDownTimerInput, { nullable: true })
  @IsOptional()
  countDown: CountDownTimerInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  thumbnail: string;

  @Field(() => DeparturePlaceInfoInput)
  @IsOptional()
  departureFrom: DeparturePlaceInfoInput;

  @Field(() => DestinationPlaceInfoInput)
  @IsOptional()
  destination: DestinationPlaceInfoInput;

  @Field(() => String, {
    defaultValue: PACKAGE_STATUS.UPCOMING,
    nullable: true,
  })
  @IsOptional()
  packageStatus: PACKAGE_STATUS;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  shortDescription: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  carouselThumbnails: string[];

  @Field(() => [RatingsAndReviewsInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RatingsAndReviewsInput)
  ratingsAndReviews: RatingsAndReviewsInput[];

  @Field(() => [TravelersInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelersInput)
  travelers: TravelersInput[];

  @Field(() => [TransportationInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransportationInput)
  transportation: TransportationInput[];
}
