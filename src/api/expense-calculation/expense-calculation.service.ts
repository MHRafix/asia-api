import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ExpenseCalculationInput } from './dto/create-expense-calculation.input';
import { ExpenseListQueryDto } from './dto/expense-list-query.dto';
import { UpdateExpenseCalculationInput } from './dto/update-expense-calculation.input';
import {
  Expense,
  ExpenseDocument,
} from './entities/expense-calculation.entity';

@Injectable()
export class ExpenseCalculationService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: Model<ExpenseDocument>,
  ) {}

  /**
   *
   * @param payload ExpenseCalculationInput
   * @returns ExpenseCalculation
   */
  create(payload: ExpenseCalculationInput) {
    return this.expenseModel.create(payload);
  }

  /**
   *
   * @param input ExpenseListQueryDto
   * @param fields string[] | string
   * @returns [ExpenseCalculation]
   */
  async findAll(input: ExpenseListQueryDto, fields: string[] | string) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.expenseModel.find(where);
    const count = await this.expenseModel.countDocuments(where);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    return new AppPaginationResponse(data, {
      totalCount: count,
      currentPage: page,
      hasNextPage: page * limit < count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   *
   * @returns [ExpenseCalculation]
   */
  async findAllExpense() {
    return this.expenseModel.find({});
  }

  async findOne(filter: FilterQuery<ExpenseDocument>) {
    try {
      const data = await this.expenseModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  update(_id: string, payload: UpdateExpenseCalculationInput) {
    return this.expenseModel.findByIdAndUpdate({ _id }, payload);
  }

  remove(_id: string) {
    return `This action removes a #${_id} expenseCalculation`;
  }
}
