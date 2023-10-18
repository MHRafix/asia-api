import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateClientDataInput } from './create-client-data.input';

@InputType()
export class UpdateClientDataInput extends PartialType(CreateClientDataInput) {
  @Field(() => String)
  _id: string;
}
