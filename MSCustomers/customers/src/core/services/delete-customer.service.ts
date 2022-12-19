import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class DeleteCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async delete(id: string): Promise<CustomerDocument> {
    const logId = 'MSCustomersDelete';
    console.log('MSCustomers calling delete...');
    console.time(logId);
    try {
      const response = await this.customerRepository.delete(id);
      console.timeEnd(logId);
      console.log('MSCustomers is responding...');
      return response;
    } catch (error) {
      console.error('Error to delete Customer...');
      throw new Error(error);
    }
  }
}
