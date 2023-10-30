import { Module } from '@nestjs/common';
import { ExpenseCalculationService } from './expense-calculation.service';
import { ExpenseCalculationResolver } from './expense-calculation.resolver';

@Module({
  providers: [ExpenseCalculationResolver, ExpenseCalculationService],
})
export class ExpenseCalculationModule {}
