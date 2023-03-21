import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserPagination } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  signUp(@Args('input') input: CreateUserInput) {
    try {
      return this.usersService.create(input);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => User)
  async signIn(@Args('input') input: CreateUserInput) {
    try {
      await this.usersService.signin(input);
      const user = await this.usersService.findOne({ email: input.email });
      const accessToken = await this.usersService.createAccessToken(user);
      user.accessToken = accessToken;
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => UserPagination, { name: 'users' })
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
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.usersService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    try {
      await this.usersService.update(input._id, input);
      return this.usersService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
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
  async bulkRemoveUser(@Args('uIds', { type: () => [String] }) uIds: string[]) {
    try {
      const res = await this.usersService.removeBulk(uIds);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
