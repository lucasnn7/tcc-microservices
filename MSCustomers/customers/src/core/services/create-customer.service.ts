import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDocument> {
    const logId = 'MSCustomersPost';
    console.log('MSCustomers calling post...');
    console.time(logId);
    try {
      const response = await this.customerRepository.create(createCustomerDto);
      console.timeEnd(logId);
      console.log('MSCustomers is responding...');
      return response;
    } catch (error) {
      console.error('Error to create a new Customer...');
      throw new Error(error);
    }
  }
}
