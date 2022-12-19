import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class ListCustomersService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async list(): Promise<CustomerDocument[]> {
    const logId = 'MSCustomersList';
    console.log('MSCustomers calling list...');
    console.time(logId);
    try {
      const response = await this.customerRepository.list();
      console.timeEnd(logId);
      console.log('MSCustomers is responding...');
      return response;
    } catch (error) {
      console.error('Error to list Customers...');
      throw new Error(error);
    }
  }
}
