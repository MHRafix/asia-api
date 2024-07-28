import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  employee: string;

  @Field(() => String)
  @IsNotEmpty()
  post: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  salary: number;
}
