import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Expense,
  ExpenseCalculationSchema,
} from './entities/expense-calculation.entity';
import { ExpenseCalculationResolver } from './expense-calculation.resolver';
import { ExpenseCalculationService } from './expense-calculation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.name, schema: ExpenseCalculationSchema },
    ]),
  ],
  providers: [ExpenseCalculationResolver, ExpenseCalculationService],
  exports: [ExpenseCalculationService],
})
export class ExpenseCalculationModule {}
