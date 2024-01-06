import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { PAYMENT_METHOD } from '../../package-booking/enums/booking-status.enum';

@InputType()
export class CreateMoneyReceiptInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => String)
  clientName: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  address: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  contactNumber: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  passportNo: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => PAYMENT_METHOD, { nullable: true })
  paymentType: PAYMENT_METHOD;

  @ApiProperty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  amountInWords: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  amountInNumber: number;

  @ApiProperty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  serviceName: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  serialNo: number;

  @ApiProperty()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  mrNo: number;

  @ApiProperty()
  @IsOptional()
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  issueDate: Date;

  @ApiProperty()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  deliveryDate: Date;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsMongoId()
  authorizeBy: string;

  @ApiProperty()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
