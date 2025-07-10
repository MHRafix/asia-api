import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  createProject(@Args('payload') payload: CreateProjectInput) {
    return this.projectService.create(payload);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.projectService.findOne(id);
  }

  // @Mutation(() => Project)
  // updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
  //   return this.projectService.update(updateProjectInput.id, updateProjectInput);
  // }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => String }) id: string) {
    return this.projectService.remove(id);
  }
}
