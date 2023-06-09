import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PACKAGE_STATUS, SALE_STATUS } from '../entities/travel-package.entity';
import { PlaceInfoInput } from './location.inpu';
import {
  CountDownTimerInput,
  RatingsAndReviewsInput,
  TravelersInput,
} from './others.input';
import { TransportationInput } from './transport.input';

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

  @Field(() => PlaceInfoInput, { nullable: true })
  @IsOptional()
  departureFrom: PlaceInfoInput;

  @Field(() => PlaceInfoInput, { nullable: true })
  @IsOptional()
  destination: PlaceInfoInput;

  @Field(() => PACKAGE_STATUS, {
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
