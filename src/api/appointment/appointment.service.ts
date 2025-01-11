import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { MailService } from '@/src/shared/mail-service/mail-sender';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { DashboardOverviewInput } from '../package-booking/dto/dashboard-overview.input';
import { Service } from '../services/entities/service.entity';
import { AppointmentListQueryDto } from './dto/appointment-list-query.dto';
import { ReplyAppointmentInput } from './dto/appointment-reply.input';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import {
  Appointment,
  APPOINTMENT_STATUS,
  AppointmentDocument,
} from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    private mailService: MailService,
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
   * send reply of appointment
   * @param payload questions answer payload
   * @returns
   */
  sendReply(payload: ReplyAppointmentInput) {
    const qa = payload?.payload?.map(
      (qa, idx) => `<div style="margin-bottom: 20px">
    <p style="margin: 5px 0; font-size: 16px; color: #34495e">
      Question ${idx}: ${qa?.question}?
    </p>
    <p style="margin: 5px 0; font-size: 16px; color: #7f8c8d">
      Answer: ${qa?.answer}
    </p>
  </div>`,
    );

    const inboxContent = `<div
	style="border: 1px solid #ccc; padding: 20px; font-family: Arial, sans-serif"
>
	<h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 15px">
		Hello ${payload?.name}
	</h2>

	<div
		style="
			border: 1px solid #ddd;
			padding: 15px;
			background-color: #f9f9f9;
			margin-bottom: 15px;
		"
	>
		${qa}
	</div>

	<p style="font-size: 14px; color: #2c3e50">Thanks</p>
	<p
		style="
			font-size: 14px;
			font-weight: bold;
			color: #2980b9;
			text-decoration: none;
		"
	>
		<a href="https://exploreasiatours.net" target="_blank">Asia Tours</a>
	</p>
</div>
`;

    return this.mailService.sendMail(payload?.email, inboxContent);
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

    // populate service here
    if (fields.includes('service')) {
      cursor.populate({
        path: 'service',
        model: Service.name,
      });
    }

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
      const cursor = this.appointmentModel.findOne(filter);

      // populate service here
      if (fields.includes('service')) {
        cursor.populate({
          path: 'service',
          model: Service.name,
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
   * update appointment
   * @param _id appointment id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateAppointmentInput) {
    return this.appointmentModel.findOneAndUpdate({ _id }, payload);
  }

  updateStatus(_id: string, status: APPOINTMENT_STATUS) {
    return this.appointmentModel.findOneAndUpdate({ _id }, { status });
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

  /**
   * remove many appointment
   * @param uIds string[]
   * @returns
   */
  appointmentsInTheDay(startDate: any, endDate: any) {
    return this.appointmentModel.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
      // status: { $eq: status },
    });
  }
}
