import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../project/entities/project.entity';
import { CreateProjectTaskInput } from './dto/create-project-task.input';
import { UpdateProjectTaskInput } from './dto/update-project-task.input';
import {
  ProjectTask,
  ProjectTaskDocument,
} from './entities/project-task.entity';

@Injectable()
export class ProjectTaskService {
  constructor(
    @InjectModel(ProjectTask.name)
    private taskModel: Model<ProjectTaskDocument>,
  ) {}

  create(payload: CreateProjectTaskInput) {
    return this.taskModel.create(payload);
  }

  async findAll(projectId: string) {
    const cursor = this.taskModel.find({ project: projectId });

    cursor.populate({
      path: 'project',
      model: Project.name,
    });

    const res = await cursor;
    return res;
  }

  update(_id: string, payload: UpdateProjectTaskInput) {
    return this.taskModel.updateOne({ _id }, payload);
  }

  remove(_id: string) {
    return this.taskModel.deleteOne({ _id });
  }
}
