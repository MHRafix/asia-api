import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';
import { CreateMoneyReceiptInput } from './dto/create-money-receipt.input';
import { MoneyReceiptListQueryDto } from './dto/money-receipt-list-query-dto';
import { UpdateMoneyReceiptInput } from './dto/update-money-receipt.input';
import {
  MoneyReceipt,
  MoneyReceiptDocument,
} from './entities/money-receipt.entity';

@Injectable()
export class MoneyReceiptsService {
  constructor(
    @InjectModel(MoneyReceipt.name)
    private moneyReceiptModel: Model<MoneyReceiptDocument>,
  ) {}

  /**
   * create service
   * @param payload create payload
   * @returns
   */
  create(payload: CreateMoneyReceiptInput) {
    return this.moneyReceiptModel.create(payload);
  }

  /**
   * get all services
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: MoneyReceiptListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.moneyReceiptModel.find(where);

    // populate service
    if (fields.includes('service')) {
      cursor.populate({
        path: 'service',
        model: Service.name,
      });
    }

    // populate author of service
    if (fields.includes('authorizeBy')) {
      cursor.populate({
        path: 'authorizeBy',
        model: User.name,
      });
    }

    const count = await this.moneyReceiptModel.countDocuments(where);
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
   * get single service
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(
    filter: FilterQuery<MoneyReceiptDocument>,
    fields: string[] = [],
  ) {
    try {
      const cursor = this.moneyReceiptModel.findOne(filter);

      // populate service
      if (fields.includes('service')) {
        cursor.populate({
          path: 'service',
          model: Service.name,
        });
      }

      // populate author of service
      if (fields.includes('authorizeBy')) {
        cursor.populate({
          path: 'authorizeBy',
          model: User.name,
        });
      }

      const data = await cursor;

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update service
   * @param _id service id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateMoneyReceiptInput) {
    return this.moneyReceiptModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete service
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<MoneyReceiptDocument>) {
    return this.moneyReceiptModel.deleteOne(filter);
  }
}
