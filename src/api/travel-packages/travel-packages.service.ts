import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { CreateTravelPackageInput } from './dto/create-travel-package.input';
import { TravelPackageListQueryDto } from './dto/travel-package-list-query.dto';
import { UpdateTravelPackageInput } from './dto/update-travel-package.input';
import {
  TravelPackage,
  TravelPackageDocument,
} from './entities/travel-package.entity';

@Injectable()
export class TravelPackagesService {
  constructor(
    @InjectModel(TravelPackage.name)
    private travelPackageModel: Model<TravelPackageDocument>, // private customerService: CustomerService,
  ) {}

  /**
   * create user
   * @param input payload
   * @returns
   */
  async create(input: CreateTravelPackageInput) {
    return this.travelPackageModel.create(input);
  }

  /**
   * get all users
   * @returns
   */
  async findAll(input: TravelPackageListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.travelPackageModel.find(where);

    // populate author of the package
    if (fields.includes('author')) {
      cursor.populate({
        path: 'author',
        model: User.name,
      });
    }

    const count = await this.travelPackageModel.countDocuments(where);
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
   * get single package
   * @param _id single user id
   * @returns
   */
  async findOne(
    filter: FilterQuery<TravelPackageDocument>,
    fields: string[] = [],
  ) {
    try {
      const cursor = this.travelPackageModel.findOne(filter);

      // populate author of the package
      if (fields.includes('author')) {
        cursor.populate({
          path: 'author',
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
   * update package id
   * @param _id package id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateTravelPackageInput) {
    return this.travelPackageModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete single customer
   * @param _id single customer id
   * @returns
   */
  async remove(filter: FilterQuery<TravelPackageDocument>) {
    return this.travelPackageModel.deleteOne(filter);
  }
}
