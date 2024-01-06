import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateMoneyReceiptInput } from './create-money-receipt.input';

@InputType()
export class UpdateMoneyReceiptInput extends PartialType(
  CreateMoneyReceiptInput,
) {
  @Field(() => ID, { nullable: true })
  _id: string;
}
