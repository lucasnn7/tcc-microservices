import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee, EmployeeDocument } from '../schemas/employee.schema';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class MongoEmployeeRepository extends EmployeeRepository {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {
    super();
  }

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    console.log(createdEmployee, 'CREATED OBJ<');
    return createdEmployee.save();
  }

  async list(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find().exec();
  }

  async get(id: string): Promise<EmployeeDocument> {
    return this.employeeModel.findOne({ idDoc: id }).exec();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    return this.employeeModel
      .findOneAndUpdate({ idDoc: id }, updateEmployeeDto)
      .exec();
  }

  async delete(id: string): Promise<EmployeeDocument> {
    return this.employeeModel.findOneAndDelete({ idDoc: id }).exec();
  }
}
