import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAppSettingInput } from './create-app-setting.input';

@InputType()
export class UpdateAppSettingInput extends PartialType(CreateAppSettingInput) {
  @Field(() => String)
  _id: string;
}
