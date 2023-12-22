import {
  VisaReq_Status,
  Visa_Types2,
} from './../entities/visa-requirement.entity';

import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateVisaRequirementInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => VisaReq_Status, {
    defaultValue: VisaReq_Status.PUBLISHED,
    nullable: true,
  })
  @IsOptional()
  status: VisaReq_Status;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  author: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  destinationCountry: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  image: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cover: string;

  @Field(() => Visa_Types2, {
    defaultValue: Visa_Types2.TOURIST,
    nullable: true,
  })
  @IsOptional()
  visaType: Visa_Types2;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
