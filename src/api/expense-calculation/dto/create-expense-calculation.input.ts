import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ExpenseCalculationInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;

  @Field(() => Number)
  @IsNotEmpty()
  amount: number;
}
