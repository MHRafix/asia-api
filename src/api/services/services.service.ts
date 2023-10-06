import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { ServiceListQueryDto } from './dto/service-list-query-dto';
import { UpdateServiceInput } from './dto/update-service.input';
import { Service, ServiceDocument } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
  ) {}

  /**
   * create service
   * @param payload create payload
   * @returns
   */
  create(payload: CreateServiceInput) {
    return this.serviceModel.create(payload);
  }

  /**
   * get all services
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: ServiceListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.serviceModel.find(where);

    // populate author of service
    if (fields.includes('author')) {
      cursor.populate({
        path: 'author',
        model: User.name,
      });
    }

    const count = await this.serviceModel.countDocuments(where);
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
  async findOne(filter: FilterQuery<ServiceDocument>, fields: string[] = []) {
    try {
      const cursor = this.serviceModel.findOne(filter);

      // populate author of service
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
   * update service
   * @param _id service id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateServiceInput) {
    return this.serviceModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete service
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<ServiceDocument>) {
    return this.serviceModel.deleteOne(filter);
  }
}
