import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from '../../project/entities/project.entity';

export type ProjectTaskDocument = ProjectTask & Document;

export enum Project_Status {
  Pending = 'Pending',
  Inprogress = 'Inprogress',
  Completed = 'Completed',
}

registerEnumType(Project_Status, {
  name: 'Project_Status',
});

@ObjectType()
@Schema({ timestamps: true })
export class ProjectTask {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String, { nullable: true })
  description?: string;

  @Prop({ default: Project_Status.Pending })
  @Field(() => Project_Status, {
    nullable: true,
    defaultValue: Project_Status.Pending,
  })
  status: Project_Status;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Field(() => Project)
  project: string;

  @Field(() => Date, { nullable: true })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const ProjectTaskSchema = SchemaFactory.createForClass(ProjectTask);

@ObjectType()
export class ProjectTaskPagination extends Paginated(ProjectTask) {}
