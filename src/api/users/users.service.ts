import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>, // private customerService: CustomerService,
  ) {}

  /**
   * create user
   * @param input payload
   * @returns
   */
  async create(input: CreateUserInput) {
    const email = input.email;
    const isExistUser = await this.userModel.findOne({ email });

    if (isExistUser) {
      throw new ForbiddenException('User already exists');
    }

    return this.userModel.create(input);
  }

  /**
   * get all users
   * @returns
   */
  async findAll(input: UserListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.userModel.find(where);
    const count = await this.userModel.countDocuments(where);
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
   * get single user
   * @param _id single user id
   * @returns
   */
  async findOne(filter: FilterQuery<UserDocument>, fields: string[] = []) {
    try {
      const data = await this.userModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update user
   * @param _id user id
   * @param input update payload
   * @returns
   */
  update(_id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findOneAndUpdate({ _id }, updateUserInput);
  }

  /**
   * delete user
   * @param filter
   * @returns
   */
  remove(filter: FilterQuery<UserDocument>) {
    return this.userModel.deleteOne(filter);
  }

  /**
   * remove many users
   * @param uids string[]
   * @returns
   */
  removeBulk(uids: string[]) {
    return this.userModel.deleteMany({
      _id: { $in: uids },
    });
  }
}
