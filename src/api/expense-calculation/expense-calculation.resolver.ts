import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';
import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExpenseCalculationInput } from './dto/create-expense-calculation.input';
import { ExpenseListQueryDto } from './dto/expense-list-query.dto';
import { UpdateExpenseCalculationInput } from './dto/update-expense-calculation.input';
import {
  Expense,
  ExpenseCalculationPagination,
} from './entities/expense-calculation.entity';
import { ExpenseCalculationService } from './expense-calculation.service';

@Resolver(() => Expense)
export class ExpenseCalculationResolver {
  constructor(
    private readonly expenseCalculationService: ExpenseCalculationService,
  ) {}

  @Mutation(() => Boolean)
  async createExpenseCalculation(
    @Args('input')
    input: ExpenseCalculationInput,
  ) {
    await this.expenseCalculationService.create(input);
    return true;
  }

  @Query(() => ExpenseCalculationPagination, { name: 'expenseCalculationList' })
  findAll(
    @Args('input', { nullable: true }) input: ExpenseListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.expenseCalculationService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Expense, { name: 'expenseCalculation' })
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.expenseCalculationService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Boolean)
  async updateExpenseCalculation(
    @Args('updateExpenseCalculationInput')
    updateExpenseCalculationInput: UpdateExpenseCalculationInput,
  ) {
    try {
      this.expenseCalculationService.update(
        updateExpenseCalculationInput._id,
        updateExpenseCalculationInput,
      );
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeExpense(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.expenseCalculationService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
