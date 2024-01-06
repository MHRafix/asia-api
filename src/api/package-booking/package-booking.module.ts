import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppointmentModule } from '../appointment/appointment.module';
import { TravelPackagesModule } from '../travel-packages/travel-packages.module';
import {
  PackageBooking,
  PackageBookingSchema,
} from './entities/package-booking.entity';
import { PackageBookingController } from './package-booking.controller';
import { PackageBookingResolver } from './package-booking.resolver';
import { PackageBookingService } from './package-booking.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      { name: PackageBooking.name, schema: PackageBookingSchema },
    ]),
    AppointmentModule,
    TravelPackagesModule,
  ],
  controllers: [PackageBookingController],
  providers: [PackageBookingResolver, PackageBookingService],
  exports: [PackageBookingService],
})
export class PackageBookingModule {}
