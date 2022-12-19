import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { AllocateProjectDto } from 'src/dto/allocate-project.dto';
import { CreateProjectContractDto } from 'src/dto/create-project-contract.dto';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import {
  CreateProjectService,
  GetProjectService,
  ListProjectsService,
  DeleteProjectService,
  UpdateProjectService,
  CreateProjectContractService,
  AllocateProjectService,
} from 'src/services';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createDepartmentService: CreateProjectService,
    private readonly getDepartmentService: GetProjectService,
    private readonly listDepartmentsService: ListProjectsService,
    private readonly removeDepartmentService: DeleteProjectService,
    private readonly updateDepartmentService: UpdateProjectService,
    private readonly createProjectContractService: CreateProjectContractService,
    private readonly allocateProjectService: AllocateProjectService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createDepartmentService.create(createProjectDto);
  }

  @Post('/allocate')
  allocateProject(@Body() allocateProjectDto: AllocateProjectDto) {
    return this.allocateProjectService.execute(allocateProjectDto);
  }

  @Post('/create-contract')
  createProjectContract(
    @Body() createProjectContractDto: CreateProjectContractDto,
  ) {
    return this.createProjectContractService.execute(createProjectContractDto);
  }

  @Post('/massive-load')
  createWithList(@Body() createProjectDto: CreateProjectDto[]) {
    return this.createDepartmentService.createWithList(createProjectDto);
  }

  @Get()
  list() {
    return this.listDepartmentsService.list();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.getDepartmentService.get(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.updateDepartmentService.update(id, updateProjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.removeDepartmentService.delete(id);
  }
}
