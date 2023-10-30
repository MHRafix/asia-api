import { Injectable } from '@nestjs/common';
import { CreateExpenseCalculationInput } from './dto/create-expense-calculation.input';
import { UpdateExpenseCalculationInput } from './dto/update-expense-calculation.input';

@Injectable()
export class ExpenseCalculationService {
  create(createExpenseCalculationInput: CreateExpenseCalculationInput) {
    return 'This action adds a new expenseCalculation';
  }

  findAll() {
    return `This action returns all expenseCalculation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseCalculation`;
  }

  update(
    id: number,
    updateExpenseCalculationInput: UpdateExpenseCalculationInput,
  ) {
    return `This action updates a #${id} expenseCalculation`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCalculation`;
  }
}
