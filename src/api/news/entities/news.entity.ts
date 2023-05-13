import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NewsDocument = News & Document;

@ObjectType()
@Schema()
export class NewsTags {
  @Prop()
  @Field(() => [String], { nullable: true })
  tags: string[];
}

@ObjectType()
@Schema({ timestamps: true })
export class News {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  category: string;

  @Prop()
  @Field(() => NewsTags, { nullable: true })
  relatedInfo: NewsTags;

  @Prop()
  @Field(() => String)
  videoUrl: string;

  @Prop()
  @Field(() => Date, { nullable: true })
  publishedAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);

@ObjectType()
export class NewsPagination extends Paginated(News) {}
