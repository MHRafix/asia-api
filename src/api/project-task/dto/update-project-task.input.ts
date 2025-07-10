import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateProjectTaskInput } from './create-project-task.input';

@InputType()
export class UpdateProjectTaskInput extends PartialType(
  CreateProjectTaskInput,
) {
  @Field(() => ID, { nullable: true })
  _id: string;
}
