import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTravelPackageInput } from './dto/create-travel-package.input';
import { TravelPackageListQueryDto } from './dto/travel-package-list-query.dto';
import { UpdateTravelPackageInput } from './dto/update-travel-package.input';
import {
  TravelPackage,
  TravelPackagePagination,
} from './entities/travel-package.entity';
import { TravelPackagesService } from './travel-packages.service';

@Resolver(() => TravelPackage)
export class TravelPackagesResolver {
  constructor(private readonly travelPackagesService: TravelPackagesService) {}

  @Mutation(() => TravelPackage)
  createTravelPackage(@Args('input') input: CreateTravelPackageInput) {
    return this.travelPackagesService.create(input);
  }

  @Query(() => TravelPackagePagination, { name: 'travelPackages' })
  findAll(
    @Args('input', { nullable: true }) input: TravelPackageListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.travelPackagesService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  @Query(() => TravelPackage, { name: 'travelPackage' })
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.travelPackagesService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => TravelPackage)
  async updateTravelPackage(
    @Args('input')
    input: UpdateTravelPackageInput,
  ) {
    try {
      await this.travelPackagesService.update(input._id, input);
      return this.travelPackagesService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async removeTravelPackage(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.travelPackagesService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
