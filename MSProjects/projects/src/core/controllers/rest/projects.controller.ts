import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectDocument } from 'src/core/schemas/project.schema';
import { CreateProjectDto } from '../../dto/create-project.dto';
import { UpdateProjectDto } from '../../dto/update-project.dto';
import {
  CreateProjectService,
  DeleteProjectService,
  GetProjectService,
  ListProjectsService,
  UpdateProjectService,
} from '../../services';

@Controller()
export class ProjectsController {
  constructor(
    private readonly createProjectService: CreateProjectService,
    private readonly deleteProjectService: DeleteProjectService,
    private readonly getProjectService: GetProjectService,
    private readonly listProjectsService: ListProjectsService,
    private readonly updateProjectService: UpdateProjectService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    return this.createProjectService.create(createProjectDto);
  }

  @Get()
  list(): Promise<ProjectDocument[]> {
    return this.listProjectsService.list();
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<ProjectDocument> {
    return this.getProjectService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    return this.updateProjectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<ProjectDocument> {
    return this.deleteProjectService.delete(id);
  }
}
