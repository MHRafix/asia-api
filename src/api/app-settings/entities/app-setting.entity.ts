import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppSettingsDocument = AppSettings & Document;

@ObjectType()
@Schema({ timestamps: false })
export class AddressSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  name: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  lat: number;

  @Prop()
  @Field(() => Number, { nullable: true })
  lng: number;
}

@ObjectType()
@Schema({ timestamps: false })
export class BranchSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  branchName: string;

  @Prop()
  @Field(() => String, { nullable: true })
  email: string;

  @Prop()
  @Field(() => String, { nullable: true })
  address: string;

  @Prop()
  @Field(() => String, { nullable: true })
  phone: string;
}

@ObjectType()
@Schema({ timestamps: false })
export class CountriesVisaSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  country: string;

  @Prop()
  @Field(() => String, { nullable: true })
  visaCategory: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class AppSettings {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String, { nullable: true })
  logo: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  visaCategories: string[];

  @Prop()
  @Field(() => [CountriesVisaSchema], { nullable: true })
  countriesVisa: CountriesVisaSchema[];

  @Prop()
  @Field(() => [BranchSchema], { nullable: true })
  branches: BranchSchema[];
}

export const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);
@ObjectType()
export class AppSettingsPagination extends Paginated(AppSettings) {}
