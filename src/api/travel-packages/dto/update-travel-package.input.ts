import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTravelPackageInput } from './create-travel-package.input';

@InputType()
export class UpdateTravelPackageInput extends PartialType(
  CreateTravelPackageInput,
) {
  @Field(() => String, { nullable: true })
  _id: string;
}
