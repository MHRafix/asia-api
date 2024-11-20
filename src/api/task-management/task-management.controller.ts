import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardTaskRevinewInput } from '../package-booking/dto/dashboard-overview.input';
import { TaskManagementService } from './task-management.service';

@Controller('dashboard')
@ApiTags('Revinew calculation')
export class TaskManagementController {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  @Post('task-revinew')
  // @UseGuards(AuthGuard())
  async taskRevinew(@Body() payload?: DashboardTaskRevinewInput) {
    try {
      return await this.taskManagementService.taskRevinewCalculation(
        payload || null,
      );
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
