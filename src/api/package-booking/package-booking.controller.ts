import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { addDays, subDays } from 'date-fns';
import { Model } from 'mongoose';
import { AppointmentService } from '../appointment/appointment.service';
import { DashboardOverviewInput } from './dto/dashboard-overview.input';
import {
  PackageBooking,
  PackageBookingDocument,
} from './entities/package-booking.entity';
import { BOOKING_STATUS } from './enums/booking-status.enum';

@Controller('bookings')
@ApiTags('Booking')
export class PackageBookingController {
  constructor(
    @InjectModel(PackageBooking.name)
    private bookingModel: Model<PackageBookingDocument>,
    private appointmentService: AppointmentService,
  ) {}

  @Get('overview')
  async getOverviewData(@Query() payload: DashboardOverviewInput) {
    /**
     * chart analytics of bookings [pending, approved, completed, canceled]
     */

    // pending bookings by date
    const pendingBookings = await this.getDateFilteredBookings(
      BOOKING_STATUS.PENDING,
      payload,
    );

    // approved bookings by date
    const approvedBookings = await this.getDateFilteredBookings(
      BOOKING_STATUS.APPROVED,
      payload,
    );

    // completed bookings by date
    const completedBookings = await this.getDateFilteredBookings(
      BOOKING_STATUS.COMPLETED,
      payload,
    );

    // canceled bookings by date
    const canceledBookings = await this.getDateFilteredBookings(
      BOOKING_STATUS.CANCELED,
      payload,
    );

    /**
     * dashboard grid card overview data [new appointments, new bookings, new flights, total transactions]
     */

    // date range
    const dateRange = this.getDateRange();

    // new bookings
    const newBookings = await this.getDateRangeFilteredBookings(
      BOOKING_STATUS.PENDING,
      {
        firstDate: dateRange[0].toISOString(),
        lastDate: dateRange[1].toISOString(),
      },
    );

    // new appointments
    const newAppointments =
      await this.appointmentService.findAppointmentsWithDateRange(
        BOOKING_STATUS.PENDING,
        {
          firstDate: dateRange[0].toISOString(),
          lastDate: dateRange[1].toISOString(),
        },
      );

    // total transaction
    const totalTransactions = await this.calculateBookingPrice(
      BOOKING_STATUS.APPROVED,
      {
        firstDate: dateRange[0].toISOString(),
        lastDate: dateRange[1].toISOString(),
      },
    );

    return {
      bookingsChartAnalytics: {
        pending: pendingBookings,
        approved: approvedBookings,
        completed: completedBookings,
        canceled: canceledBookings,
      },
      overViewCardData: {
        newAppointments: newAppointments.length,
        newBookings: newBookings.length,
        newFlights: 44,
        totalTransactions: totalTransactions,
      },
    };
  }

  // calculate booking amount
  async calculateBookingPrice(status: string, payload: DashboardOverviewInput) {
    let totalAmount = 0;
    const bookings = await this.getDateRangeFilteredBookings(status, payload);
    bookings.map(
      (booking) =>
        (totalAmount = booking?.paymentDetails?.totalAmount + totalAmount),
    );
    return totalAmount;
  }

  // filter booking with date range and status
  async getDateRangeFilteredBookings(
    status: string,
    filter: DashboardOverviewInput,
  ) {
    return this.bookingModel.find({
      createdAt: {
        $gte: filter?.firstDate,
        $lte: filter?.lastDate,
      },
      status: { $eq: status },
    });
  }

  // filter booking with date and status
  async getDateFilteredBookings(
    status: string,
    filter: DashboardOverviewInput,
  ) {
    var getDaysArray = function (s, e) {
      for (
        var a = [], d = new Date(s);
        d <= new Date(e);
        d.setDate(d.getDate() + 1)
      ) {
        a.push(new Date(d));
      }
      return a;
    };

    let bookings = [];
    getDaysArray(filter?.firstDate, filter?.lastDate)?.map(async (date) => {
      const startDate = subDays(new Date(date), 1);
      const endDate = addDays(startDate, 1);

      const bookingsInTheDay = await this.bookingModel.find({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
        status: { $eq: status },
      });
      bookings.push(bookingsInTheDay?.length);
    });
    return bookings;
  }

  getDateRange = (): [Date, Date] => {
    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - firstDate.getDate() + 1);

    return [firstDate, new Date()];
  };
}
