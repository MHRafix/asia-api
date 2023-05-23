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
  PACKAGE_IN,
  PACKAGE_STATUS,
  SALE_STATUS,
  TOURBY,
} from '../entities/travel-package.entity';
@InputType()
export class TravelOutlineInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  public departureFrom: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public destinationTo: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  public startAt: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  public endAt: Date;

  @Field(() => PACKAGE_IN, {
    defaultValue: PACKAGE_IN.DOMESTIC,
    nullable: true,
  })
  @IsOptional()
  public packageIn: PACKAGE_IN;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public description: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public breakfast: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public lunch: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public normalSnacks: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public dinner: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public otherFeatures: string;
}

@InputType()
export class RatingsAndReviewsInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  public rating: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public message: string;
}

@InputType()
export class TravelersInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  public travelerEmail: string;
}

@InputType()
export class TransportationInput {
  @Field(() => TOURBY, { defaultValue: TOURBY.BY_ROAD })
  @IsOptional()
  public tourBy: TOURBY;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public departureFrom: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public destination: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public startAt: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public transportName: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  public stops: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public journeyBreak: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  public endAt: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  public transportDate: Date;
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
export class CarouselThumbnailsInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  thumbnail: string;
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

  @Field(() => [CarouselThumbnailsInput], { nullable: true })
  @IsOptional()
  @IsArray()
  public carouselThumbnails: CarouselThumbnailsInput[];

  @Field(() => [TravelOutlineInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelOutlineInput)
  public travelOutline: TravelOutlineInput[];

  @Field(() => [RatingsAndReviewsInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RatingsAndReviewsInput)
  public ratingsAndReviews: RatingsAndReviewsInput[];

  @Field(() => [TravelersInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelersInput)
  public travelers: TravelersInput[];

  @Field(() => [TransportationInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransportationInput)
  public transportation: TransportationInput[];
}
