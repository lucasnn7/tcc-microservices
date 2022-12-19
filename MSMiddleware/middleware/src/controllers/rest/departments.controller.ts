import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateDepartmentDto } from 'src/dto/create-department.dto';
import { UpdateDepartmentDto } from 'src/dto/update-department.dto';
import {
  CreateDepartmentService,
  GetDepartmentService,
  ListDepartmentsService,
  DeleteDepartmentService,
  UpdateDepartmentService,
} from 'src/services';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly createDepartmentService: CreateDepartmentService,
    private readonly getDepartmentService: GetDepartmentService,
    private readonly listDepartmentsService: ListDepartmentsService,
    private readonly removeDepartmentService: DeleteDepartmentService,
    private readonly updateDepartmentService: UpdateDepartmentService,
  ) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.createDepartmentService.create(createDepartmentDto);
  }

  @Post('/massive-load')
  createWithList(@Body() createDepartmentDto: CreateDepartmentDto[]) {
    return this.createDepartmentService.createWithList(createDepartmentDto);
  }

  @Get()
  list() {
    return this.listDepartmentsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getDepartmentService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.updateDepartmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.removeDepartmentService.delete(id);
  }
}
