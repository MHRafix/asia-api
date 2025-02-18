import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';
import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { AppointmentListQueryDto } from './dto/appointment-list-query.dto';
import { ReplyAppointmentInput } from './dto/appointment-reply.input';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import {
  Appointment,
  APPOINTMENT_STATUS,
  AppointmentPagination,
} from './entities/appointment.entity';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation(() => Appointment)
  createAppointment(
    @Args('input')
    input: CreateAppointmentInput,
  ) {
    return this.appointmentService.create(input);
  }

  @Mutation(() => Boolean)
  async sendAppointmentReply(
    @Args('input')
    input: ReplyAppointmentInput,
  ) {
    try {
      await this.appointmentService.sendReply(input);
      await this.appointmentService.updateStatus(
        input?._id,
        APPOINTMENT_STATUS.COMPLETED,
      );
      return true;
    } catch (error) {
      return new ForbiddenException();
    }
  }

  @Query(() => AppointmentPagination, { name: 'appointments' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('input', { nullable: true }) input: AppointmentListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.appointmentService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Appointment, { name: Appointment.name })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('input') input: CommonMatchInput, @Info() info: any) {
    try {
      const fields = getGqlFields(info);
      const find = mongodbFindObjectBuilder(input);
      return this.appointmentService.findOne(find, fields);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Appointment)
  @UseGuards(GqlAuthGuard)
  async updateAppointment(
    @Args('input')
    input: UpdateAppointmentInput,
  ) {
    try {
      await this.appointmentService.update(input._id, input);
      return this.appointmentService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeAppointment(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.appointmentService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async bulkRemoveAppointment(
    @Args('uIds', { type: () => [String] }) uIds: string[],
  ) {
    try {
      const res = await this.appointmentService.removeBulk(uIds);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
