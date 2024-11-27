import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  _id: string;
}

@InputType()
export class UpdateUserAndEmployeeRoleInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  user_id: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  employee_id: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  role: string;
}
