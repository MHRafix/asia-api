import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNewsInput } from './dto/create-news.input';
import { NewsListQueryDto } from './dto/news-list-query.dto';
import { UpdateNewsInput } from './dto/update-news.input';
import { News, NewsPagination } from './entities/news.entity';
import { NewsService } from './news.service';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Mutation(() => News)
  createNews(@Args('input') input: CreateNewsInput) {
    return this.newsService.create(input);
  }

  @Query(() => NewsPagination, { name: 'allNews' })
  findAll(
    @Args('input', { nullable: true }) input: NewsListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.newsService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // @Query(() => News, { name: 'news' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.newsService.findOne(id);
  // }

  @Query(() => News, { name: 'news' })
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.newsService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // @Mutation(() => News)
  // updateNews(@Args('updateNewsInput') updateNewsInput: UpdateNewsInput) {
  //   return this.newsService.update(updateNewsInput.id, updateNewsInput);
  // }

  @Mutation(() => News)
  async updateNews(
    @Args('input')
    input: UpdateNewsInput,
  ) {
    try {
      await this.newsService.update(input._id, input);
      return this.newsService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // @Mutation(() => News)
  // removeNews(@Args('id', { type: () => Int }) id: number) {
  //   return this.newsService.remove(id);
  // }

  @Mutation(() => Boolean, { nullable: true })
  async removeNews(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.newsService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
