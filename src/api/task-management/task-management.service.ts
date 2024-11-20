import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ClientData } from '../client-data/entities/client-data.entity';
import { DashboardTaskRevinewInput } from '../package-booking/dto/dashboard-overview.input';
import { Team } from '../team/entities/team.entity';
import { TeamService } from '../team/team.service';
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
    private teamService: TeamService,
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
   * @param employeeIds string[]
   * @returns string
   */
  async taskRevinewCalculation(payload?: DashboardTaskRevinewInput) {
    const allTask = await this.taskManagementModel.find({});

    // revinew by employee
    const revinewByEmployee = [];

    if (payload?.employeeIds?.length) {
      await Promise.all(
        payload?.employeeIds.map(async (employeeId: string) => {
          const employee = await this.teamService.findOne({
            _id: employeeId,
          });

          // Simulate an async operation, fetching tasks
          const taskByEmployee = await Promise.resolve(
            allTask?.filter(
              (task: TaskManagement) =>
                task?.taskDetails?.taskAssignTo === employeeId,
            ) || [],
          );

          // Calculate totalAmount and paidAmount
          const { totalAmount, paidAmount } = taskByEmployee.reduce(
            (acc, task: TaskManagement) => {
              acc.totalAmount += task?.totalBillAmount || 0;
              acc.paidAmount += task?.paidBillAmount || 0;

              return acc;
            },
            { totalAmount: 0, paidAmount: 0 }, // Initial accumulator values
          );

          // Add calculated data to the revenue array
          revinewByEmployee.push({
            title: employee?.name,
            totalAmount,
            paidAmount,
            dueAmount: totalAmount - paidAmount,
          });
        }),
      );
      return revinewByEmployee;
    } else {
      // total amount
      const totalAmount = allTask?.reduce(
        (sum, task: TaskManagement) => sum + (task?.totalBillAmount || 0),
        0,
      );

      // paid amount
      const paidAmount = allTask?.reduce(
        (sum, task: TaskManagement) => sum + (task?.paidBillAmount || 0),
        0,
      );

      // due amount
      const dueAmount = totalAmount - paidAmount;

      revinewByEmployee?.push({
        title: 'Grand Revinew',
        totalAmount,
        paidAmount,
        dueAmount,
      });
      return revinewByEmployee;
    }
  }
}
