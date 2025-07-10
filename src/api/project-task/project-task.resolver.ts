import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectTaskInput } from './dto/create-project-task.input';
import { UpdateProjectTaskInput } from './dto/update-project-task.input';
import { ProjectTask } from './entities/project-task.entity';
import { ProjectTaskService } from './project-task.service';

@Resolver(() => ProjectTask)
export class ProjectTaskResolver {
  constructor(private readonly projectTaskService: ProjectTaskService) {}

  @Mutation(() => ProjectTask)
  addTask(@Args('payload') payload: CreateProjectTaskInput) {
    return this.projectTaskService.create(payload);
  }

  @Query(() => [ProjectTask], { name: 'tasksByProjects' })
  findAll(@Args('projectId', { type: () => String }) projectId: string) {
    return this.projectTaskService.findAll(projectId);
  }

  // @Query(() => ProjectTask, { name: 'projectTask' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.projectTaskService.findOne(id);
  // }

  @Mutation(() => ProjectTask)
  async updateProjectTask(
    @Args('payload')
    payload: UpdateProjectTaskInput,
  ) {
    try {
      await this.projectTaskService.update(payload._id, payload);

      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Boolean)
  async removeProjectTask(@Args('id', { type: () => String }) id: string) {
    try {
      await this.projectTaskService.remove(id);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
