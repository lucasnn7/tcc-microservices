import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/dto/update-customer.dto';
import {
  CreateCustomerService,
  GetCustomerService,
  ListCustomersService,
  DeleteCustomerService,
  UpdateCustomerService,
} from 'src/services';
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerService: CreateCustomerService,
    private readonly getCustomerService: GetCustomerService,
    private readonly listCustomersService: ListCustomersService,
    private readonly removeCustomerService: DeleteCustomerService,
    private readonly updateCustomerService: UpdateCustomerService,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomerService.create(createCustomerDto);
  }

  @Post('/massive-load')
  createWithList(@Body() createCustomerDto: CreateCustomerDto[]) {
    return this.createCustomerService.createWithList(createCustomerDto);
  }

  @Get()
  list() {
    return this.listCustomersService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getCustomerService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.updateCustomerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.removeCustomerService.delete(id);
  }
}
