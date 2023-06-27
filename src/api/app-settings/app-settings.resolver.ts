import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsListQueryDto } from './dto/appSettings-query.dto';
import { CreateAppSettingInput } from './dto/create-app-setting.input';
import { UpdateAppSettingInput } from './dto/update-app-setting.input';
import {
  AppSettings,
  AppSettingsPagination,
} from './entities/app-setting.entity';

@Resolver(() => AppSettings)
export class AppSettingsResolver {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Mutation(() => AppSettings)
  @UseGuards(GqlAuthGuard)
  createAppSetting(@Args('input') payload: CreateAppSettingInput) {
    return this.appSettingsService.create(payload);
  }

  @Query(() => AppSettingsPagination, { name: 'appSettings' })
  findAll(
    @Args('input', { nullable: true }) input: AppSettingsListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.appSettingsService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateAppSettings(
    @Args('input')
    input: UpdateAppSettingInput,
  ) {
    try {
      return this.appSettingsService.update(input._id, input);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
