import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { CreateTaskManagementInput } from './dto/create-task-management.input';
import { TaskListQueryDto } from './dto/task-list-query.input';
import { UpdateTaskManagementInput } from './dto/update-task-management.input';
import {
  TaskManagement,
  TaskManagementDocument,
} from './entities/task-management.entity';

@Injectable()
export class TaskManagementService {
  constructor(
    @InjectModel(TaskManagement.name)
    private taskManagementModel: Model<TaskManagementDocument>,
  ) {}

  /**
   * create taskManagement
   * @param payload create payload
   * @returns
   */
  create(payload: CreateTaskManagementInput) {
    return this.taskManagementModel.create(payload);
  }

  /**
   * get all taskManagements
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: TaskListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.taskManagementModel.find(where);

    // populate post author info
    if (fields.includes('taskCreateBy')) {
      cursor.populate({
        path: 'taskCreateBy',
        model: User.name,
      });
    }

    // populate assign user info
    if (fields.includes('taskDetails')) {
      cursor.populate({
        path: 'taskDetails',
        populate: {
          path: 'taskAssignTo',
          model: User.name,
        },
      });
    }

    const count = await this.taskManagementModel.countDocuments(where);
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
   * get single taskManagement
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(
    filter: FilterQuery<TaskManagementDocument>,
    fields: string[] = [],
  ) {
    try {
      const cursor = this.taskManagementModel.findOne(filter);

      // populate post author info
      if (fields.includes('taskCreateBy')) {
        cursor.populate({
          path: 'taskCreateBy',
          model: User.name,
        });
      }

      // populate assign user info
      if (fields.includes('taskDetails')) {
        cursor.populate({
          path: 'taskDetails',
          populate: {
            path: 'taskAssignTo',
            model: User.name,
          },
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
   * update taskManagement
   * @param _id taskManagement id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateTaskManagementInput) {
    return this.taskManagementModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete taskManagement
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<TaskManagementDocument>) {
    return this.taskManagementModel.deleteOne(filter);
  }
}
