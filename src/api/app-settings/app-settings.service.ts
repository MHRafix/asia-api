import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppSettingsListQueryDto } from './dto/appSettings-query.dto';
import { CreateAppSettingInput } from './dto/create-app-setting.input';
import { UpdateAppSettingInput } from './dto/update-app-setting.input';
import {
  AppSettings,
  AppSettingsDocument,
} from './entities/app-setting.entity';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectModel(AppSettings.name)
    private appSettingsModel: Model<AppSettingsDocument>,
  ) {}

  /**
   * create app settings
   * @param payload create settings payload
   * @returns
   */
  create(payload: CreateAppSettingInput) {
    return this.appSettingsModel.create(payload);
  }

  /**
   * get all appointments
   * @param input inputs
   * @param fields fields
   * @returns
   */
  async findAll(input: AppSettingsListQueryDto, fields: string[] = []) {
    console.log(input);
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.appSettingsModel.find(where);
    const count = await this.appSettingsModel.countDocuments(where);
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
   * update appSettings
   * @param _id app settings id
   * @param payload update payload
   * @returns
   */
  update(_id: string, payload: UpdateAppSettingInput) {
    return this.appSettingsModel.findOneAndUpdate({ _id }, payload);
  }
}
