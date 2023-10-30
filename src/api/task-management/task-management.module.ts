import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskManagement,
  TaskManagementSchema,
} from './entities/task-management.entity';
import { TaskManagementResolver } from './task-management.resolver';
import { TaskManagementService } from './task-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskManagement.name, schema: TaskManagementSchema },
    ]),
  ],
  providers: [TaskManagementResolver, TaskManagementService],
})
export class TaskManagementModule {}
