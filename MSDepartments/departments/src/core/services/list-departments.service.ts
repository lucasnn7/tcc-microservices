import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../repositories/department.repository';
import { DepartmentDocument } from '../schemas/department.schema';

@Injectable()
export class ListDepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async list(): Promise<DepartmentDocument[]> {
    const logId = 'MSDepartmensList';
    console.log('MSDepartments calling list...');
    console.time(logId);
    try {
      const response = await this.departmentRepository.list();
      console.timeEnd(logId);
      console.log('MSDepartments is responding...');
      return response;
    } catch (error) {
      console.error('Error to list Departments...');
      throw new Error(error);
    }
  }
}
