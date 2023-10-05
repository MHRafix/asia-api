import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { BlogListQueryDto } from './dto/blog-list-query.dto';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog, BlogDocument } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<BlogDocument>,
  ) {}

  /**
   * create blog
   * @param payload create payload
   * @returns
   */
  create(payload: CreateBlogInput) {
    return this.blogModel.create(payload);
  }

  /**
   * get all blogs
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: BlogListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.blogModel.find(where);

    // populate post author info
    if (fields.includes('author')) {
      cursor.populate({
        path: 'author',
        model: User.name,
      });
    }

    const count = await this.blogModel.countDocuments(where);
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
   * get single blog
   * @param filter filter
   * @param fields fields
   * @returns
   */
  async findOne(filter: FilterQuery<BlogDocument>, fields: string[] = []) {
    try {
      const data = await this.blogModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('Data is not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update blog
   * @param _id blog id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateBlogInput) {
    return this.blogModel.findOneAndUpdate({ _id }, payload);
  }

  /**
   * delete blog
   * @param filter filter
   * @returns
   */
  remove(filter: FilterQuery<BlogDocument>) {
    return this.blogModel.deleteOne(filter);
  }
}
