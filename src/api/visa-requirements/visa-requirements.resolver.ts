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
import { CreateVisaRequirementInput } from './dto/create-visa-requirement.input';
import { UpdateVisaRequirementInput } from './dto/update-visa-requirement.input';
import { VisaReqListQueryDto } from './dto/visa-req-list-query.dto';
import { VisaReq, VisaReqPagination } from './entities/visa-requirement.entity';
import { VisaRequirementsService } from './visa-requirements.service';

@Resolver(() => VisaReq)
export class VisaRequirementsResolver {
  constructor(private readonly visaReqService: VisaRequirementsService) {}
  @Mutation(() => Boolean)
  // @UseGuards(GqlAuthGuard)
  async createVisaReq(@Args('input') input: CreateVisaRequirementInput) {
    await this.visaReqService.create(input);
    return true;
  }

  @Query(() => VisaReqPagination, { name: 'VisaRequirements' })
  findAll(
    @Args('input', { nullable: true }) input: VisaReqListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.visaReqService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => VisaReq, { name: 'VisaRequirement' })
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.visaReqService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateVisaReq(
    @Args('input')
    input: UpdateVisaRequirementInput,
  ) {
    try {
      await this.visaReqService.update(input._id, input);
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeVisaReq(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.visaReqService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
