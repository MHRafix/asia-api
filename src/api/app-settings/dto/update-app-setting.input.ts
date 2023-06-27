import { CreateAppSettingInput } from './create-app-setting.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAppSettingInput extends PartialType(CreateAppSettingInput) {
  @Field(() => String)
  id: string;
}
