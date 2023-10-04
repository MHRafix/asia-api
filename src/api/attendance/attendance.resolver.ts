import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { Attendance, AttendancePagination } from './entities/attendance.entity';
import { AttendanceQueryDto } from './dto/attendance-list-query.dto';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}
  @Mutation(() => Boolean)
  // @UseGuards(GqlAuthGuard)
  async createAttendance(@Args('input') input: CreateAttendanceInput) {
    await this.attendanceService.create(input);
    return true;
  }

  @Query(() => AttendancePagination, { name: 'Attendances' })
  findAll(
    @Args('input', { nullable: true }) input: AttendanceQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.attendanceService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Attendance, { name: Attendance.name })
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.attendanceService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateAttendance(
    @Args('input')
    input: UpdateAttendanceInput,
  ) {
    try {
      await this.attendanceService.update(input._id, input);
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeAttendance(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.attendanceService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
