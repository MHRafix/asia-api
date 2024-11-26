import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ExpenseCalculationInput } from './create-expense-calculation.input';

@InputType()
export class UpdateExpenseCalculationInput extends PartialType(
  ExpenseCalculationInput,
) {
  @Field(() => String)
  _id: string;
}
