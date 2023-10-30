import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpenseCalculationService } from './expense-calculation.service';
import { ExpenseCalculation } from './entities/expense-calculation.entity';
import { CreateExpenseCalculationInput } from './dto/create-expense-calculation.input';
import { UpdateExpenseCalculationInput } from './dto/update-expense-calculation.input';

@Resolver(() => ExpenseCalculation)
export class ExpenseCalculationResolver {
  constructor(
    private readonly expenseCalculationService: ExpenseCalculationService,
  ) {}

  @Mutation(() => ExpenseCalculation)
  createExpenseCalculation(
    @Args('createExpenseCalculationInput')
    createExpenseCalculationInput: CreateExpenseCalculationInput,
  ) {
    return this.expenseCalculationService.create(createExpenseCalculationInput);
  }

  @Query(() => [ExpenseCalculation], { name: 'expenseCalculation' })
  findAll() {
    return this.expenseCalculationService.findAll();
  }

  @Query(() => ExpenseCalculation, { name: 'expenseCalculation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.expenseCalculationService.findOne(id);
  }

  @Mutation(() => ExpenseCalculation)
  updateExpenseCalculation(
    @Args('updateExpenseCalculationInput')
    updateExpenseCalculationInput: UpdateExpenseCalculationInput,
  ) {
    return this.expenseCalculationService.update(
      updateExpenseCalculationInput.id,
      updateExpenseCalculationInput,
    );
  }

  @Mutation(() => ExpenseCalculation)
  removeExpenseCalculation(@Args('id', { type: () => Int }) id: number) {
    return this.expenseCalculationService.remove(id);
  }
}
