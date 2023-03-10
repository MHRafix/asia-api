import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePackageBookingInput } from './create-package-booking.input';

@InputType()
export class UpdatePackageBookingInput extends PartialType(
  CreatePackageBookingInput,
) {
  @Field(() => ID, { nullable: true })
  _id: string;
}
