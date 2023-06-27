import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class AddressInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  name: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  lat: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  lng: number;
}

@InputType()
export class BranchInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  branchName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email: string;

  @Field(() => AddressInput, { nullable: true })
  @IsOptional()
  address: AddressInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}

@InputType()
export class CountriesVisaInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  country: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  visaCategory: string;
}

@InputType()
export class CreateAppSettingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  _id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  logo: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  visaCategories: string[];

  @Field(() => [CountriesVisaInput], { nullable: true })
  @IsOptional()
  countriesVisa: CountriesVisaInput[];

  @Field(() => [BranchInput], { nullable: true })
  @IsOptional()
  branches: BranchInput[];
}
