import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class PlaceInfoInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lat: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lng: string;
}
