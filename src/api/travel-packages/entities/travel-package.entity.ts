import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlaceInfoSchema } from './location.entity';
import { CountDownTimer, RatingsAndReviews, Travelers } from './others.entity';
import { Transportation } from './transport.entity';

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

  @Prop({
    required: false,
  })
  @Field(() => [String], { nullable: true })
  carouselThumbnails: string[];

  @Prop({ required: false })
  @Field(() => [RatingsAndReviews], { nullable: true })
  ratingsAndReviews: RatingsAndReviews[];

  @Prop()
  @Field(() => PlaceInfoSchema, { nullable: true })
  departureFrom: PlaceInfoSchema;

  @Prop()
  @Field(() => PlaceInfoSchema, { nullable: true })
  destination: PlaceInfoSchema;

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
