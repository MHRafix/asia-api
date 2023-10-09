import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateVisaRequirementInput } from './create-visa-requirement.input';

@InputType()
export class UpdateVisaRequirementInput extends PartialType(
  CreateVisaRequirementInput,
) {
  @Field(() => String, { nullable: true })
  _id: string;
}
