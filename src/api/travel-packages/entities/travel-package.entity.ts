import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from 'mongoose';

export type TravelPackageDocument = TravelPackage & Document;

export enum PACKAGE_IN {
  DOMESTIC = 'DOMESTIC',
  INTERNATIONAL = 'INTERNATIONAL',
}

registerEnumType(PACKAGE_IN, {
  name: 'PACKAGE_IN',
});
export enum SALE_STATUS {
  FIXED = 'FIXED',
  SALE = 'SALE',
}

registerEnumType(SALE_STATUS, {
  name: 'SALE_STATUS',
});

export enum PACKAGE_STATUS {
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED',
  ALWAYS = 'ALWAYS',
}

registerEnumType(PACKAGE_STATUS, {
  name: 'PACKAGE_STATUS',
});

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
export class RatingsAndReviews {
  @Prop()
  @Field(() => Number, { nullable: true })
  @IsOptional()
  rating: number;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  email: string;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  message: string;
}

@ObjectType()
@Schema()
export class DeparturePlaceInfo {
  @Prop()
  @Field(() => String)
  @IsNotEmpty()
  departureFrom: string;

  @Prop()
  @Field(() => Number)
  @IsNotEmpty()
  lat: number;

  @Prop()
  @Field(() => Number)
  @IsNotEmpty()
  lng: number;
}

@ObjectType()
@Schema()
export class DestinationPlaceInfo {
  @Prop()
  @Field(() => String)
  @IsNotEmpty()
  destination: string;

  @Prop()
  @Field(() => Number)
  @IsNotEmpty()
  lat: number;

  @Prop()
  @Field(() => Number)
  @IsNotEmpty()
  lng: number;
}

@ObjectType()
@Schema({ timestamps: true })
export class Travelers {
  @Prop({
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsOptional()
  travelerEmail: string;
}

@ObjectType()
@Schema()
export class Transportation {
  @Prop({ default: TOURBY.BY_ROAD })
  @Field(() => TOURBY, { defaultValue: TOURBY.BY_ROAD })
  @IsOptional()
  tourBy: TOURBY;

  @Prop()
  @Field(() => DeparturePlaceInfo)
  @IsOptional()
  departureFrom: DeparturePlaceInfo;

  @Prop()
  @Field(() => DestinationPlaceInfo)
  @IsOptional()
  destination: DestinationPlaceInfo;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  startAt: string;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  transportName: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  @IsOptional()
  stops: number;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  journeyBreak: string;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  endAt: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  @IsOptional()
  transportDate: Date;
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

@ObjectType()
@Schema({ timestamps: true })
export class TravelPackage {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ required: true })
  @Field(() => String)
  packageTitle: string;

  @Prop({ required: true })
  @Field(() => Number)
  regularPrice: number;

  @Prop({ required: false, default: 0 })
  @Field(() => Number, { nullable: true })
  salePrice: number;

  @Prop({ required: true, default: SALE_STATUS.FIXED })
  @Field(() => SALE_STATUS, { defaultValue: SALE_STATUS.FIXED })
  saleStatus: SALE_STATUS;

  @Prop({ default: false, required: true })
  @Field(() => Boolean)
  isPublished: boolean;

  @Prop({ default: PACKAGE_STATUS.UPCOMING })
  @Field(() => PACKAGE_STATUS, { defaultValue: PACKAGE_STATUS.UPCOMING })
  packageStatus: PACKAGE_STATUS;

  @Prop()
  @Field(() => CountDownTimer, { nullable: true })
  countDown: CountDownTimer;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  thumbnail: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  description: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  shortDescription: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  destination: string;

  @Prop({
    required: false,
  })
  @Field(() => [String], { nullable: true })
  carouselThumbnails: string[];

  @Prop({ required: false })
  @Field(() => [RatingsAndReviews], { nullable: true })
  ratingsAndReviews: RatingsAndReviews[];

  @Prop({ required: false })
  @Field(() => [Travelers], { nullable: true })
  travelers: Travelers[];

  @Prop({ required: false })
  @Field(() => [Transportation], { nullable: true })
  transportation: Transportation[];
}

export const TravelPackageSchema = SchemaFactory.createForClass(TravelPackage);

@ObjectType()
export class TravelPackagePagination extends Paginated(TravelPackage) {}
