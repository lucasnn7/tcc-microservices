import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class ListEmployeesService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async list(): Promise<EmployeeDocument[]> {
    const logId = 'MSEmployeesList';
    console.log('MSEmployees calling list...');
    console.time(logId);
    try {
      const response = await this.employeeRepository.list();
      console.timeEnd(logId);
      console.log('MSEmployees is responding...');
      return response;
    } catch (error) {
      console.error('Error to list Employees...');
      throw new Error(error);
    }
  }
}
