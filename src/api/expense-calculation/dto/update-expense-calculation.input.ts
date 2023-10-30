import { CreateExpenseCalculationInput } from './create-expense-calculation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseCalculationInput extends PartialType(
  CreateExpenseCalculationInput,
) {
  @Field(() => Int)
  id: number;
}
