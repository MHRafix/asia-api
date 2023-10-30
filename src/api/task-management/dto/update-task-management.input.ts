import { CreateTaskManagementInput } from './create-task-management.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskManagementInput extends PartialType(
  CreateTaskManagementInput,
) {
  @Field(() => Int)
  id: number;
}
