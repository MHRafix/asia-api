import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardTaskRevinewInput } from '../package-booking/dto/dashboard-overview.input';
import { DateRangeFilter } from './dto/filter-query.dto';
import { TaskManagementService } from './task-management.service';

@Controller('dashboard')
@ApiTags('Revinew calculation')
export class TaskManagementController {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  @Post('task-revinew-by-employee')
  // @UseGuards(AuthGuard())
  async taskRevinewByEmployee(
    @Query() filter: DateRangeFilter,
    @Body() payload?: DashboardTaskRevinewInput,
  ) {
    try {
      return await this.taskManagementService.taskRevinewByEmployeeCalculation(
        filter,
        payload || null,
      );
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Get('task-grand-revinew')
  // @UseGuards(AuthGuard())
  async taskGrandRevinew(@Query() filter: DateRangeFilter) {
    try {
      return await this.taskManagementService.taskGrandRevinewCalculation();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
