import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class MongoCustomerRepository extends CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {
    super();
  }

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDocument> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    console.log(createCustomerDto, 'CREATED OBJ<');
    return createdCustomer.save();
  }

  async list(): Promise<CustomerDocument[]> {
    return this.customerModel.find().exec();
  }

  async get(id: string): Promise<CustomerDocument> {
    return this.customerModel.findOne({ idDoc: id }).exec();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerDocument> {
    return this.customerModel
      .findOneAndUpdate({ idDoc: id }, updateCustomerDto)
      .exec();
  }

  async delete(id: string): Promise<CustomerDocument> {
    return this.customerModel.findOneAndDelete({ idDoc: id }).exec();
  }
}
