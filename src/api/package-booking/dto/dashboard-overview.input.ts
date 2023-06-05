import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class DashboardOverviewInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastDate: string;
}
