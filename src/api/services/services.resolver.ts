import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateServiceInput } from './dto/create-service.input';
import { ServiceListQueryDto } from './dto/service-list-query-dto';
import { UpdateServiceInput } from './dto/update-service.input';
import { Service, ServicePagination } from './entities/service.entity';
import { ServicesService } from './services.service';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation(() => Service)
  createService(@Args('input') input: CreateServiceInput) {
    return this.servicesService.create(input);
  }

  @Query(() => ServicePagination, { name: 'services' })
  findAll(
    @Args('input', { nullable: true }) input: ServiceListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.servicesService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.servicesService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Service)
  async updateService(
    @Args('input')
    input: UpdateServiceInput,
  ) {
    try {
      await this.servicesService.update(input._id, input);
      return this.servicesService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async removeService(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.servicesService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
