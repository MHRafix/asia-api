import { CreateVisaRequirementInput } from './create-visa-requirement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVisaRequirementInput extends PartialType(
  CreateVisaRequirementInput,
) {
  @Field(() => Int)
  id: number;
}
