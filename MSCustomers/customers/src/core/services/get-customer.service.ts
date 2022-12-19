import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class GetCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async get(id: string): Promise<CustomerDocument> {
    const logId = 'MSCustomersGet';
    console.log('MSCustomers calling get...');
    console.time(logId);
    try {
      const response = await this.customerRepository.get(id);
      console.timeEnd(logId);
      console.log('MSCustomers is responding...');
      return response;
    } catch (error) {
      console.error('Error to get Customer...');
      throw new Error(error);
    }
  }
}
