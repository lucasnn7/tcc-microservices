import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
// import { ConsumerService } from '../kafka/consumer.service';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class UpdateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerDocument> {
    const logId = 'MSCustomersUpdate';
    console.log('MSCustomers calling update...');
    console.time(logId);
    try {
      const response = await this.customerRepository.update(
        id,
        updateCustomerDto,
      );
      console.timeEnd(logId);
      console.log('MSCustomers is responding...');
      return response;
    } catch (error) {
      console.error('Error to update Customer...');
      throw new Error(error);
    }
  }
}
