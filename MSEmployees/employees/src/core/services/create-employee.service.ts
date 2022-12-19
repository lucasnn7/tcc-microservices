import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class CreateEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const logId = 'MSEmployeesPost';
    console.log('MSEmployees calling post...');
    console.time(logId);
    try {
      const response = await this.employeeRepository.create(createEmployeeDto);
      console.timeEnd(logId);
      console.log('MSEmployees is responding...');
      return response;
    } catch (error) {
      console.error('Error to create a new Employee...');
      throw new Error(error);
    }
  }
}
