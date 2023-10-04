import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
import { Attendance, AttendanceSchema } from './entities/attendance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
    ]),
  ],
  providers: [AttendanceResolver, AttendanceService],
})
export class AttendanceModule {}
