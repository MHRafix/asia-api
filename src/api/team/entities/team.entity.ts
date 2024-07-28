import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type TeamDocument = Team & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Team {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  employee: string;

  @Prop()
  @Field(() => String)
  post: string;

  @Prop()
  @Field(() => Number, { nullable: true })
  salary: number;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

@ObjectType()
export class TeamPagination extends Paginated(Team) {}
