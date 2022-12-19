import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AllocateEmployeeDto } from 'src/dto/allocate-employee.dto';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { GetMonthlyPaymentDto } from 'src/dto/get-monthly-payment-dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import {
  CreateEmployeeService,
  GetEmployeeService,
  ListEmployeesService,
  DeleteEmployeeService,
  UpdateEmployeeService,
  GetMonthlyPaymentService,
  AllocateEmployeeService,
  DismissEmployeeService,
} from 'src/services';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly createEmployeeService: CreateEmployeeService,
    private readonly getEmployeeService: GetEmployeeService,
    private readonly listEmployeesService: ListEmployeesService,
    private readonly deleteEmployeeService: DeleteEmployeeService,
    private readonly updateEmployeeService: UpdateEmployeeService,
    private readonly getMonthlyPaymentService: GetMonthlyPaymentService,
    private readonly allocateEmployeeService: AllocateEmployeeService,
    private readonly dismissEmployeeService: DismissEmployeeService,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.createEmployeeService.create(createEmployeeDto);
  }

  @Post('/allocate')
  allocateEmployee(@Body() allocateEmployeeDto: AllocateEmployeeDto) {
    return this.allocateEmployeeService.execute(allocateEmployeeDto);
  }

  @Post('/massive-load')
  createWithList(@Body() createEmployeeDto: CreateEmployeeDto[]) {
    return this.createEmployeeService.createWithList(createEmployeeDto);
  }

  @Get()
  list() {
    return this.listEmployeesService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getEmployeeService.get(id);
  }

  @Get('/monthly-payment')
  getMonthlyPayment(@Query() filtersQuery: GetMonthlyPaymentDto) {
    return this.getMonthlyPaymentService.execute(filtersQuery);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.updateEmployeeService.update(id, updateEmployeeDto);
  }

  @Put('/dismiss')
  dismissEmployee(@Param('id') id: string) {
    return this.dismissEmployeeService.execute(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteEmployeeService.delete(id);
  }
}
