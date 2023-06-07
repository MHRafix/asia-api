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
