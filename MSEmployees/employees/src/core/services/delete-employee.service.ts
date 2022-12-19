import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class DeleteEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async delete(id: string): Promise<EmployeeDocument> {
    const logId = 'MSEmployeesDelete';
    console.log('MSEmployees calling delete...');
    console.time(logId);
    try {
      const response = await this.employeeRepository.delete(id);
      console.timeEnd(logId);
      console.log('MSEmployees is responding...');
      return response;
    } catch (error) {
      console.error('Error to delete Employee...');
      throw new Error(error);
    }
  }
}
