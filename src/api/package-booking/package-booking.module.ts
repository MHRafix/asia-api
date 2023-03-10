import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PackageBooking,
  PackageBookingSchema,
} from './entities/package-booking.entity';
import { PackageBookingResolver } from './package-booking.resolver';
import { PackageBookingService } from './package-booking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PackageBooking.name, schema: PackageBookingSchema },
    ]),
  ],
  providers: [PackageBookingResolver, PackageBookingService],
})
export class PackageBookingModule {}
