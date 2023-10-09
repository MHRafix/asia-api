import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBlogInput } from './create-blog.input';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field(() => String, { nullable: true })
  _id: string;
}
