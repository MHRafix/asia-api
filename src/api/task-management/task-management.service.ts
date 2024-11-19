import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ClientData } from '../client-data/entities/client-data.entity';
import { Team } from '../team/entities/team.entity';
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
   * create task
   * @param payload create payload
   * @returns
   */
  create(payload: CreateTaskManagementInput) {
    return this.taskManagementModel.create(payload);
  }

  /**
   * get all task
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: TaskListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.taskManagementModel.find(where);

    // populate client info
    if (fields.includes('client')) {
      cursor.populate({
        path: 'client',
        model: ClientData.name,
      });
    }

    // populate post author info
    if (fields.includes('taskCreatedBy')) {
      cursor.populate({
        path: 'taskCreatedBy',
        model: User.name,
      });
    }

    // populate assign user info
    if (fields.includes('taskDetails')) {
      cursor.populate({
        path: 'taskDetails',
        populate: {
          path: 'taskAssignTo',
          model: Team.name,
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
   * get single task
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
      if (fields.includes('taskCreatedBy')) {
        cursor.populate({
          path: 'taskCreatedBy',
          model: User.name,
        });
      }

      // populate assign user info
      if (fields.includes('taskDetails')) {
        cursor.populate({
          path: 'taskDetails',
          populate: {
            path: 'taskAssignTo',
            model: Team.name,
          },
        });
      }

      // populate client info
      if (fields.includes('client')) {
        cursor.populate({
          path: 'client',
          model: ClientData.name,
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
   * update task
   * @param _id task id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateTaskManagementInput) {
    return this.taskManagementModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete task
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<TaskManagementDocument>) {
    return this.taskManagementModel.deleteOne(filter);
  }

  /**
   *
   * @param employeeId string
   * @returns string
   */
  async taskRevinewCalculation(employeeId: string) {
    const allTask = await this.taskManagementModel.find({});

    if (employeeId) {
      const taskByEmployee = allTask?.filter(
        (task: TaskManagement) =>
          task?.taskDetails?.taskAssignTo === employeeId,
      );

      const totalAmount = taskByEmployee?.reduce(
        (sum, task: TaskManagement) => sum + (task?.totalBillAmount || 0),
        0,
      );

      const paidAmount = taskByEmployee?.reduce(
        (sum, task: TaskManagement) => sum + (task?.paidBillAmount || 0),
        0,
      );

      return [totalAmount, paidAmount, totalAmount - paidAmount]; // [total amount | paid amount | due amount]
    } else {
      const totalAmount = allTask?.reduce(
        (sum, task: TaskManagement) => sum + (task?.totalBillAmount || 0),
        0,
      );

      const paidAmount = allTask?.reduce(
        (sum, task: TaskManagement) => sum + (task?.paidBillAmount || 0),
        0,
      );

      return [totalAmount, paidAmount, totalAmount - paidAmount]; // [total amount | paid amount | due amount]
    }
  }
}
