import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { DashboardOverviewInput } from '../package-booking/dto/dashboard-overview.input';
import { AppointmentListQueryDto } from './dto/appointment-list-query.dto';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import {
  Appointment,
  AppointmentDocument,
} from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>, // private customerService: CustomerService,
  ) {}

  /**
   * create appointment
   * @param payload appointment payload
   * @returns
   */
  create(payload: CreateAppointmentInput) {
    return this.appointmentModel.create(payload);
  }

  /**
   * get all appointments
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: AppointmentListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.appointmentModel.find(where);
    const count = await this.appointmentModel.countDocuments(where);
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

  findAppointmentsWithDateRange(
    status: string,
    filter: DashboardOverviewInput,
  ) {
    return this.appointmentModel.find({
      createdAt: {
        $gte: filter?.firstDate,
        $lte: filter?.lastDate,
      },
      status: { $eq: status },
    });
  }

  /**
   * get single appointment
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(
    filter: FilterQuery<AppointmentDocument>,
    fields: string[] = [],
  ) {
    try {
      const data = await this.appointmentModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update appointment
   * @param _id appointment id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateAppointmentInput) {
    return this.appointmentModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete appointment
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<AppointmentDocument>) {
    return this.appointmentModel.deleteOne(filter);
  }

  /**
   * remove many appointment
   * @param uIds string[]
   * @returns
   */
  removeBulk(uIds: string[]) {
    return this.appointmentModel.deleteMany({
      _id: { $in: uIds },
    });
  }
}
