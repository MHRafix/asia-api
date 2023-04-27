import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateNewsInput } from './dto/create-news.input';
import { NewsListQueryDto } from './dto/news-list-query.dto';
import { UpdateNewsInput } from './dto/update-news.input';
import { News, NewsDocument } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private newsModel: Model<NewsDocument>,
  ) {}

  /**
   * create new news
   * @param payload create news model
   * @returns
   */
  create(payload: CreateNewsInput) {
    return this.newsModel.create(payload);
  }

  /**
   * get all news
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: NewsListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.newsModel.find(where);
    const count = await this.newsModel.countDocuments(where);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    return new AppPaginationResponse(data, {
      totalCount: count,
      currentPage: page,
      hasNextPage: page * limit < count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   * get single news
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(filter: FilterQuery<NewsDocument>, fields: string[] = []) {
    try {
      const data = await this.newsModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update news
   * @param _id service id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateNewsInput) {
    return this.newsModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete news
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<NewsDocument>) {
    return this.newsModel.deleteOne(filter);
  }
}
