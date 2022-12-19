import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './controllers/rest/customers.controller';
import { KafkaModule } from './kafka/kafka.module';
import { CustomerRepository } from './repositories/customer.repository';
import { MongoCustomerRepository } from './repositories/mongo.customer.repository';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import {
  AssignProjectContractedService,
  CreateCustomerService,
  DeleteCustomerService,
  GetCustomerService,
  ListCustomersService,
  UpdateCustomerService,
} from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    KafkaModule,
  ],
  controllers: [CustomersController],
  providers: [
    AssignProjectContractedService,
    CreateCustomerService,
    DeleteCustomerService,
    GetCustomerService,
    ListCustomersService,
    UpdateCustomerService,
    {
      provide: CustomerRepository,
      useClass: MongoCustomerRepository,
    },
  ],
})
export class CustomersModule {}
