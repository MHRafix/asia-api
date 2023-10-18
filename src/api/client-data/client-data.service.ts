import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ClientDataListQueryDto } from './dto/client-data-list-query-input.dto';
import { CreateClientDataInput } from './dto/create-client-data.input';
import { UpdateClientDataInput } from './dto/update-client-data.input';
import { ClientData, ClientDataDocument } from './entities/client-data.entity';

@Injectable()
export class ClientDataService {
  constructor(
    @InjectModel(ClientData.name)
    private clientDataModel: Model<ClientDataDocument>, // private customerService: CustomerService,
  ) {}

  /**
   * create team
   * @param payload create payload
   * @returns
   */
  create(payload: CreateClientDataInput) {
    return this.clientDataModel.create(payload);
  }

  /**
   * get all team
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: ClientDataListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.clientDataModel.find(where);
    const count = await this.clientDataModel.countDocuments(where);
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
   * get single team
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(
    filter: FilterQuery<ClientDataDocument>,
    fields: string[] = [],
  ) {
    try {
      const data = await this.clientDataModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update team
   * @param _id team id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateClientDataInput) {
    return this.clientDataModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete team
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<ClientDataDocument>) {
    return this.clientDataModel.deleteOne(filter);
  }

  /**
   * remove many team
   * @param uIds string[]
   * @returns
   */
  removeBulk(uIds: string[]) {
    return this.clientDataModel.deleteMany({
      _id: { $in: uIds },
    });
  }
}
