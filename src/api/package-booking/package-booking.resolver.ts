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
import { BookingPackageListQueryDto } from './dto/booking-list-query.dto';
import { CreatePackageBookingInput } from './dto/create-package-booking.input';
import { UpdatePackageBookingInput } from './dto/update-package-booking.input';
import {
  PackageBooking,
  PackageBookingPagination,
} from './entities/package-booking.entity';
import { PackageBookingService } from './package-booking.service';

@Resolver(() => PackageBooking)
export class PackageBookingResolver {
  constructor(private readonly packageBookingService: PackageBookingService) {}

  @Mutation(() => PackageBooking)
  createBooking(@Args('input') input: CreatePackageBookingInput) {
    return this.packageBookingService.create(input);
  }

  @Query(() => PackageBookingPagination, { name: 'bookings' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('input', { nullable: true }) input: BookingPackageListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.packageBookingService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // @Query(() => DashboardOverviewInput, { name: 'dashboardOverviewData' })
  // dashboardOverviewData(
  //   @Args('input', { nullable: true }) input: BookingPackageListQueryDto,
  //   @Info() info: any,
  // ) {
  //   try {
  //     const fields = getGqlFields(info, 'nodes');
  //     return this.packageBookingService.findAll(input, fields);
  //   } catch (err) {
  //     throw new BadRequestException(err.message);
  //   }
  // }

  @Query(() => PackageBooking, { name: 'booking' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('input') input: CommonMatchInput, @Info() info: any) {
    try {
      const fields = getGqlFields(info);

      const find = mongodbFindObjectBuilder(input);
      return this.packageBookingService.findOne(find, fields);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => PackageBooking)
  @UseGuards(GqlAuthGuard)
  async updateBooking(
    @Args('input')
    input: UpdatePackageBookingInput,
  ) {
    try {
      await this.packageBookingService.update(input._id, input);
      return this.packageBookingService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeBooking(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.packageBookingService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async bulkRemoveBooking(
    @Args('uIds', { type: () => [String] }) uIds: string[],
  ) {
    try {
      const res = await this.packageBookingService.removeBulk(uIds);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
