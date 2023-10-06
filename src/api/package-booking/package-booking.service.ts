import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { TravelPackage } from '../travel-packages/entities/travel-package.entity';
import { User } from '../users/entities/user.entity';
import { BookingPackageListQueryDto } from './dto/booking-list-query.dto';
import { CreatePackageBookingInput } from './dto/create-package-booking.input';
import { UpdatePackageBookingInput } from './dto/update-package-booking.input';
import {
  PackageBooking,
  PackageBookingDocument,
} from './entities/package-booking.entity';

@Injectable()
export class PackageBookingService {
  constructor(
    @InjectModel(PackageBooking.name)
    private packageBookingModel: Model<PackageBookingDocument>, // private customerService: CustomerService,
  ) {}

  /**
   * create package booking
   * @param payload create payload
   * @returns
   */
  async create(payload: CreatePackageBookingInput) {
    const isExistTransactionId = await this.packageBookingModel.findOne({
      transactionId: payload?.transactionId,
    });

    if (isExistTransactionId) {
      throw new BadRequestException(
        'Booking is already exist with given transaction Id',
      );
    }

    return this.packageBookingModel.create(payload);
  }

  /**
   * get all package booking
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: BookingPackageListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.packageBookingModel.find(where);

    // populate customer details info
    if (fields.includes('customerDetails')) {
      cursor.populate({
        path: 'customerDetails',
        model: User.name,
      });
    }

    // populate package details info
    if (fields.includes('packageId')) {
      cursor.populate({
        path: 'packageId',
        model: TravelPackage.name,
      });
    }

    // populate author of package here
    if (fields.includes('packageId')) {
      cursor.populate({
        path: 'packageId',
        populate: {
          path: 'author',
          model: User.name,
        },
      });
    }

    const count = await this.packageBookingModel.countDocuments(where);
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
   * get single package booking
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(
    filter: FilterQuery<PackageBookingDocument>,
    fields: string[] = [],
  ) {
    try {
      // TODO: Need on demand population
      const cursor = this.packageBookingModel.findOne(filter);

      // populate customer here
      if (fields.includes('customerDetails')) {
        cursor.populate({
          path: 'customerDetails',
          model: User.name,
        });
      }

      // populate package here
      if (fields.includes('packageId')) {
        cursor.populate({
          path: 'packageId',
          model: TravelPackage.name,
        });
      }

      // populate author of package here
      if (fields.includes('packageId')) {
        cursor.populate({
          path: 'packageId',
          populate: {
            path: 'author',
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
   * update package booking
   * @param _id package booking id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdatePackageBookingInput) {
    return this.packageBookingModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete package booking
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<PackageBookingDocument>) {
    return this.packageBookingModel.deleteOne(filter);
  }

  /**
   * remove many bookings
   * @param uids string[]
   * @returns
   */
  removeBulk(uids: string[]) {
    return this.packageBookingModel.deleteMany({
      _id: { $in: uids },
    });
  }
}
