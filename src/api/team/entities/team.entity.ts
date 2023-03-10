import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TeamDocument = Team & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Team {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  public name: string;

  @Prop()
  @Field(() => String)
  public post: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public avatar: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String, { nullable: true })
  facebook: string;

  @Prop()
  @Field(() => String, { nullable: true })
  linkedin: string;

  @Prop()
  @Field(() => String, { nullable: true })
  phone: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

@ObjectType()
export class TeamPagination extends Paginated(Team) {}
