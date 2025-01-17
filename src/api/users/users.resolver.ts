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
import { TeamService } from '../team/team.service';
import { CreateUserInput } from './dto/create-user.input';
import {
  UpdateUserAndEmployeeRoleInput,
  UpdateUserInput,
} from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserPagination } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private teamService: TeamService,
  ) {}

  @Mutation(() => User)
  signUp(@Args('input') input: CreateUserInput) {
    try {
      return this.usersService.signup(input);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => User)
  async signIn(@Args('input') input: CreateUserInput) {
    try {
      return this.usersService.signIn(input);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => User)
  async adminSignIn(@Args('input') input: CreateUserInput) {
    try {
      return this.usersService.adminSignIn(input);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => UserPagination, { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('input', { nullable: true }) input: UserListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.usersService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.usersService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('input') input: UpdateUserInput) {
    try {
      await this.usersService.update(input._id, input);
      return this.usersService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateUserAndEmployeeRole(
    @Args('input')
    input: UpdateUserAndEmployeeRoleInput,
  ) {
    try {
      await this.usersService.roleUpdate(input);
      if (input?.employee_id) {
        await this.teamService.updateEmployeeRole(input);
      }
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async removeUser(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.usersService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async bulkRemoveUser(@Args('uIds', { type: () => [String] }) uIds: string[]) {
    try {
      const res = await this.usersService.removeBulk(uIds);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
