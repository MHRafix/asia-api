import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_ROLE } from '../../users/entities/user.entity';

export type TeamDocument = Team & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Team {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  post: string;

  @Prop()
  @Field(() => USER_ROLE)
  role: USER_ROLE;

  @Prop()
  @Field(() => String, { nullable: true })
  avatar: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  salary: number;

  @Prop()
  @Field(() => String, { nullable: true })
  phone: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

@ObjectType()
export class TeamPagination extends Paginated(Team) {}
