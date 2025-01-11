import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ExpenseCalculationInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;

  @Field(() => Number)
  @IsNotEmpty()
  amount: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  createdAt: Date;
}
