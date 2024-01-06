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
import { CreateMoneyReceiptInput } from './dto/create-money-receipt.input';
import { MoneyReceiptListQueryDto } from './dto/money-receipt-list-query-dto';
import { UpdateMoneyReceiptInput } from './dto/update-money-receipt.input';
import {
  MoneyReceipt,
  MoneyReceiptPagination,
} from './entities/money-receipt.entity';
import { MoneyReceiptsService } from './money-receipt.service';

@Resolver(() => MoneyReceipt)
export class MoneyReceiptResolver {
  constructor(private readonly moneyReceiptService: MoneyReceiptsService) {}

  @Mutation(() => MoneyReceipt)
  @UseGuards(GqlAuthGuard)
  createMoneyReceipt(@Args('input') input: CreateMoneyReceiptInput) {
    return this.moneyReceiptService.create(input);
  }

  @Query(() => MoneyReceiptPagination, { name: 'moneyReceipts' })
  findAll(
    @Args('input', { nullable: true }) input: MoneyReceiptListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.moneyReceiptService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => MoneyReceipt, { name: 'moneyReceipt' })
  findOne(@Args('input') input: CommonMatchInput, @Info() info: any) {
    try {
      const fields = getGqlFields(info);
      const find = mongodbFindObjectBuilder(input);
      return this.moneyReceiptService.findOne(find, fields);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => MoneyReceipt)
  @UseGuards(GqlAuthGuard)
  async updateMoneyReceipt(
    @Args('input')
    input: UpdateMoneyReceiptInput,
  ) {
    try {
      await this.moneyReceiptService.update(input._id, input);
      return this.moneyReceiptService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeMoneyReceipt(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.moneyReceiptService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
