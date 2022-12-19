import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeDocument } from 'src/core/schemas/employee.schema';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../dto/update-employee.dto';
import {
  CreateEmployeeService,
  DeleteEmployeeService,
  GetEmployeeService,
  ListEmployeesService,
  UpdateEmployeeService,
} from '../../services';

@Controller()
export class EmployeesController {
  constructor(
    private readonly createEmployeeService: CreateEmployeeService,
    private readonly deleteEmployeeService: DeleteEmployeeService,
    private readonly getEmployeeService: GetEmployeeService,
    private readonly listEmployeesService: ListEmployeesService,
    private readonly updateEmployeeService: UpdateEmployeeService,
  ) {}

  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    return this.createEmployeeService.create(createEmployeeDto);
  }

  @Get()
  list(): Promise<EmployeeDocument[]> {
    return this.listEmployeesService.list();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<EmployeeDocument> {
    return this.getEmployeeService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    return this.updateEmployeeService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<EmployeeDocument> {
    return this.deleteEmployeeService.delete(id);
  }
}
