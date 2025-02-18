import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateUserAndEmployeeRoleInput } from '../users/dto/update-user.input';
import { User } from '../users/entities/user.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { TeamListQueryDto } from './dto/team-list-query-input.dto';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team, TeamDocument } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<TeamDocument>, // private customerService: CustomerService,
  ) {}

  /**
   * create team
   * @param payload create payload
   * @returns
   */
  create(payload: CreateTeamInput) {
    return this.teamModel.create(payload);
  }

  /**
   * get all team
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: TeamListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.teamModel.find(where);

    // populate employee info
    if (fields.includes('employee')) {
      cursor.populate({
        path: 'employee',
        model: User.name,
      });
    }

    const count = await this.teamModel.countDocuments(where);
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

  async findAllEmployeeIds() {
    const employees = await this.teamModel.find({});

    const employeesIds =
      employees?.map((employee: Team) => employee?._id) || [];
    return employeesIds;
  }

  /**
   * get single team
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(filter: FilterQuery<TeamDocument>, fields: string[] = []) {
    try {
      const cursor = this.teamModel.findOne(filter);

      // populate employee info
      if (fields.includes('employee')) {
        cursor.populate({
          path: 'employee',
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
   * update team
   * @param _id team id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateTeamInput) {
    return this.teamModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * update employee role
   * @param payload UpdateUserAndEmployeeRoleInput
   * @returns
   */
  updateEmployeeRole(payload: UpdateUserAndEmployeeRoleInput) {
    return this.teamModel.findOneAndUpdate(
      { _id: payload?.employee_id },
      { role: payload?.role },
    );
  }

  /**
   * delete team
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<TeamDocument>) {
    return this.teamModel.deleteOne(filter);
  }

  /**
   * remove many team
   * @param uids string[]
   * @returns
   */
  removeBulk(uids: string[]) {
    return this.teamModel.deleteMany({
      _id: { $in: uids },
    });
  }
}
