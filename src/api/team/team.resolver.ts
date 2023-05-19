import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeamInput } from './dto/create-team.input';
import { TeamListQueryDto } from './dto/team-list-query-input.dto';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team, TeamPagination } from './entities/team.entity';
import { TeamService } from './team.service';
import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  createTeam(@Args('input') input: CreateTeamInput) {
    return this.teamService.create(input);
  }

  @Query(() => TeamPagination, { name: 'teams' })
  findAll(
    @Args('input', { nullable: true }) input: TeamListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.teamService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Team, { name: 'team' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.teamService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  async updateTeam(
    @Args('input')
    input: UpdateTeamInput,
  ) {
    try {
      await this.teamService.update(input._id, input);
      return this.teamService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeTeam(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.teamService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
