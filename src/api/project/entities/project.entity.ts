import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProjectDocument = Project & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Project {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => String)
  avatar: string;

  @Field(() => Date, { nullable: true })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

@ObjectType()
export class ProjectPagination extends Paginated(Project) {}
