import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentDocument } from 'src/core/schemas/department.schema';
import { CreateDepartmentDto } from '../../dto/create-department.dto';
import { UpdateDepartmentDto } from '../../dto/update-department.dto';
import {
  CreateDepartmentService,
  DeleteDepartmentService,
  GetDepartmentService,
  ListDepartmentsService,
  UpdateDepartmentService,
} from '../../services';

@Controller()
export class DepartmentsController {
  constructor(
    private readonly createDepartmentService: CreateDepartmentService,
    private readonly deleteDepartmentService: DeleteDepartmentService,
    private readonly getDepartmentService: GetDepartmentService,
    private readonly listDepartmentsService: ListDepartmentsService,
    private readonly updateDepartmentService: UpdateDepartmentService,
  ) {}

  @Post()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentDocument> {
    return this.createDepartmentService.create(createDepartmentDto);
  }

  @Get()
  list(): Promise<DepartmentDocument[]> {
    return this.listDepartmentsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<DepartmentDocument> {
    return this.getDepartmentService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentDocument> {
    return this.updateDepartmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DepartmentDocument> {
    return this.deleteDepartmentService.delete(id);
  }
}
