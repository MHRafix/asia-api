import { MailService } from '@/src/shared/mail-service/mail-sender';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from '../services/services.module';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    ServicesModule,
  ],

  providers: [AppointmentResolver, AppointmentService, MailService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
