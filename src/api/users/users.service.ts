import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { compare } from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  /**
   * create user
   * @param input payload
   * @returns
   */

  async create(input: CreateUserInput) {
    const email = input.email;
    const existUser = await this.userModel.findOne({ email });

    if (existUser) {
      throw new UnauthorizedException('User already exist');
    }

    input.password = bcryptjs.hashSync(input.password, 10);
    const newUser = await this.userModel.create(input);
    const accessToken = await this.createAccessToken(newUser);
    newUser.accessToken = accessToken;
    return newUser;
  }

  async signin(input: CreateUserInput) {
    const email = input.email;
    const existUser = await this.userModel.findOne({ email });

    if (!existUser) {
      throw new NotFoundException('User not found!');
    }

    compare(input.password, existUser.password, async (err, same) => {
      if (err || !same) {
        throw new NotFoundException('Invalid credentials');
      }
    });
  }

  /**
   * generate token
   * @param user
   * @returns
   */
  async createAccessToken(user: any) {
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    return jsonwebtoken.sign(payload, process.env.JWT_SECRET);
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
