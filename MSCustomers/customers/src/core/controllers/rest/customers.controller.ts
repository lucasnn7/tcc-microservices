import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerDocument } from 'src/core/schemas/customer.schema';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import {
  CreateCustomerService,
  DeleteCustomerService,
  GetCustomerService,
  ListCustomersService,
  UpdateCustomerService,
} from '../../services';

@Controller()
export class CustomersController {
  constructor(
    private readonly createCustomerService: CreateCustomerService,
    private readonly deleteCustomerService: DeleteCustomerService,
    private readonly getCustomerService: GetCustomerService,
    private readonly listCustomersService: ListCustomersService,
    private readonly updateCustomerService: UpdateCustomerService,
  ) {}

  @Post()
  create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDocument> {
    return this.createCustomerService.create(createCustomerDto);
  }

  @Get()
  list(): Promise<CustomerDocument[]> {
    return this.listCustomersService.list();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<CustomerDocument> {
    return this.getCustomerService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerDocument> {
    return this.updateCustomerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<CustomerDocument> {
    return this.deleteCustomerService.delete(id);
  }
}
