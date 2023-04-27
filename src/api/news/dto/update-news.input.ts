import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateNewsInput } from './create-news.input';

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsInput) {
  @Field(() => String)
  _id: string;
}
