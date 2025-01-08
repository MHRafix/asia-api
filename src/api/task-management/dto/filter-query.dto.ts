import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@ObjectType()
@InputType()
export class DateRangeFilter {
  @ApiProperty({ required: false })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  endDate: Date;
}
