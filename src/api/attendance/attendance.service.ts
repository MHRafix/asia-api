import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { AttendanceQueryDto } from './dto/attendance-list-query.dto';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { Attendance, AttendanceDocument } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  /**
   * create attendance
   * @param payload create payload
   * @returns
   */
  create(payload: CreateAttendanceInput) {
    return this.attendanceModel.create(payload);
  }

  /**
   * get all attendances
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: AttendanceQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.attendanceModel.find(where);

    // populate post author info
    if (fields.includes('attendee')) {
      cursor.populate({
        path: 'attendee',
        model: User.name,
      });
    }

    // populate share from user info
    if (fields.includes('verifyBy')) {
      cursor.populate({
        path: 'verifyBy',
        model: User.name,
      });
    }

    const count = await this.attendanceModel.countDocuments(where);
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
   * get single attendance
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(
    filter: FilterQuery<AttendanceDocument>,
    fields: string[] = [],
  ) {
    try {
      const cursor = this.attendanceModel.findOne(filter);

      // populate post author info
      if (fields.includes('attendee')) {
        cursor.populate({
          path: 'attendee',
          model: User.name,
        });
      }

      // populate share from user info
      if (fields.includes('verifyBy')) {
        cursor.populate({
          path: 'verifyBy',
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
   * update attendance
   * @param _id attendance id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateAttendanceInput) {
    return this.attendanceModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete attendance
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<AttendanceDocument>) {
    return this.attendanceModel.deleteOne(filter);
  }
}
