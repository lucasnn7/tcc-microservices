import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerDocument } from '../schemas/customer.schema';

export abstract class CustomerRepository {
  abstract create(createCustomerDto: CreateCustomerDto): Promise<any>;

  abstract list(): Promise<CustomerDocument[]>;

  abstract get(id: string): Promise<CustomerDocument>;

  abstract update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerDocument>;

  abstract delete(id: string): Promise<CustomerDocument>;
}
