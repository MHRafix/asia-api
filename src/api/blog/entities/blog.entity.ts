import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type BlogDocument = Blog & Document;

export enum Blog_Status {
  PUBLISHED = 'PUBLISHED',
  PAUSED = 'PAUSED',
  ARCHIVE = 'ARCHIVE',
}

registerEnumType(Blog_Status, {
  name: 'Blog_Status',
});

export enum Visa_Types {
  TOURIST = 'TOURIST',
  WORK_PERMIT = 'WORK_PERMIT',
  MEDICAL = 'MEDICAL',
  BUSINESS = 'BUSINESS',
}

registerEnumType(Visa_Types, {
  name: 'Visa_Types',
});

@ObjectType()
@Schema({ timestamps: true })
export class Blog {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  author: string;

  @Prop({ default: Blog_Status.PUBLISHED })
  @Field(() => Blog_Status, {
    defaultValue: Blog_Status.PUBLISHED,
    nullable: true,
  })
  status: Blog_Status;

  @Prop()
  @Field(() => Date, { nullable: true })
  date: Date;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => String)
  country: string;

  @Prop()
  @Field(() => Number)
  like: number;

  @Prop()
  @Field(() => String, { nullable: true })
  image: string;

  @Prop()
  @Field(() => String, { nullable: true })
  cover: string;

  @Prop({ default: Visa_Types.TOURIST })
  @Field(() => Visa_Types, {
    defaultValue: Visa_Types.TOURIST,
    nullable: true,
  })
  visaType: Visa_Types;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

@ObjectType()
export class BlogPagination extends Paginated(Blog) {}
