import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

@ObjectType()
export class DashboardTaskRevinewInput {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  employeeIds?: string[];
}
