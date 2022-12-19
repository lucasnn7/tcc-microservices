import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class GetEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async get(id: string): Promise<EmployeeDocument> {
    const logId = 'MSEmployeesGet';
    console.log('MSEmployees calling get...');
    console.time(logId);
    try {
      const response = await this.employeeRepository.get(id);
      console.timeEnd(logId);
      console.log('MSEmployees is responding...');
      return response;
    } catch (error) {
      console.error('Error to get Employee...');
      throw new Error(error);
    }
  }
}
