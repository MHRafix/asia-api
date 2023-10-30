import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExpenseCalculationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
