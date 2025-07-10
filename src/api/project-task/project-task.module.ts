import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from '../project/project.module';
import { ProjectTask, ProjectTaskSchema } from './entities/project-task.entity';
import { ProjectTaskResolver } from './project-task.resolver';
import { ProjectTaskService } from './project-task.service';

@Module({
  imports: [
    ProjectModule,
    MongooseModule.forFeature([
      { name: ProjectTask.name, schema: ProjectTaskSchema },
    ]),
  ],
  providers: [ProjectTaskResolver, ProjectTaskService],
})
export class ProjectTaskModule {}
