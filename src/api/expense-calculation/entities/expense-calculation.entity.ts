import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ExpenseDocument = Expense & Document;

@ObjectType()
@Schema()
export class Expense {
  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => Number)
  amount: number;
}

export const ExpenseCalculationSchema = SchemaFactory.createForClass(Expense);

@ObjectType()
export class ExpenseCalculationPagination extends Paginated(Expense) {}
