import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { TOURBY } from '../entities/transport.entity';

@InputType()
export class TransportationInput {
  @Field(() => TOURBY, { defaultValue: TOURBY.BY_ROAD })
  @IsOptional()
  tourBy: TOURBY;

  @Field(() => String, { nullable: true })
  @IsOptional()
  departureStation: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  destinationStation: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  departureDate: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  departureTime: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  transportName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  stops: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  journeyBreak: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  arrivalTime: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  arrivalDate: Date;
}
