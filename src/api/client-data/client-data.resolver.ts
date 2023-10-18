import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';
import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientDataService } from './client-data.service';
import { ClientDataListQueryDto } from './dto/client-data-list-query-input.dto';
import { CreateClientDataInput } from './dto/create-client-data.input';
import { UpdateClientDataInput } from './dto/update-client-data.input';
import {
  ClientData,
  ClientDataPagination,
} from './entities/client-data.entity';

@Resolver(() => ClientData)
export class ClientDataResolver {
  constructor(private readonly clientDataService: ClientDataService) {}

  @Mutation(() => ClientData)
  // @UseGuards(GqlAuthGuard)
  createClientData(@Args('input') input: CreateClientDataInput) {
    return this.clientDataService.create(input);
  }

  @Query(() => ClientDataPagination, { name: 'Clients' })
  findAll(
    @Args('input', { nullable: true }) input: ClientDataListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.clientDataService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => ClientData, { name: 'Client' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.clientDataService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => ClientData)
  @UseGuards(GqlAuthGuard)
  async updateClientData(
    @Args('input')
    input: UpdateClientDataInput,
  ) {
    try {
      await this.clientDataService.update(input._id, input);
      return this.clientDataService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeClientData(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.clientDataService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async bulkRemoveClientData(
    @Args('uIds', { type: () => [String] }) uIds: string[],
  ) {
    try {
      const res = await this.clientDataService.removeBulk(uIds);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
