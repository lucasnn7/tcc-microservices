import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../repositories/department.repository';
import { DepartmentDocument } from '../schemas/department.schema';

@Injectable()
export class GetDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async get(id: string): Promise<DepartmentDocument> {
    const logId = 'MSDepartmentsGet';
    console.log('MSDepartments calling get...');
    console.time(logId);
    try {
      const response = await this.departmentRepository.get(id);
      console.timeEnd(logId);
      console.log('MSDepartments is responding...');
      return response;
    } catch (error) {
      console.error('Error to get Department...');
      throw new Error(error);
    }
  }
}
