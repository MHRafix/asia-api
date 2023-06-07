import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

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
