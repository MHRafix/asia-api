import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectInput } from './dto/create-project.input';
import { Project, ProjectDocument } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}
  create(payload: CreateProjectInput) {
    return this.projectModel.create(payload);
  }

  findAll() {
    return this.projectModel.find({});
  }

  findOne(_id: string) {
    return this.projectModel.findOne({ _id });
  }

  remove(_id: string) {
    return this.projectModel.deleteOne({ _id });
  }
}
