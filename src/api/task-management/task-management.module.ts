import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseCalculationModule } from '../expense-calculation/expense-calculation.module';
import { TeamModule } from '../team/team.module';
import {
  TaskManagement,
  TaskManagementSchema,
} from './entities/task-management.entity';
import { TaskManagementController } from './task-management.controller';
import { TaskManagementResolver } from './task-management.resolver';
import { TaskManagementService } from './task-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskManagement.name, schema: TaskManagementSchema },
    ]),
    TeamModule,
    ExpenseCalculationModule,
  ],
  controllers: [TaskManagementController],
  providers: [TaskManagementResolver, TaskManagementService],
})
export class TaskManagementModule {}
