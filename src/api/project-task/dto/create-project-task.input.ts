import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Project_Status } from '../entities/project-task.entity';

@InputType()
export class CreateProjectTaskInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  description?: string;

  @Field(() => Project_Status, {
    nullable: true,
    defaultValue: Project_Status.Pending,
  })
  @IsOptional()
  status: Project_Status;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  project: string;

  @Field(() => Date, { nullable: true })
  createAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
