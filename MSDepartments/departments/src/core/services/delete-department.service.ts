import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../repositories/department.repository';
import { DepartmentDocument } from '../schemas/department.schema';

@Injectable()
export class DeleteDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async delete(id: string): Promise<DepartmentDocument> {
    const logId = 'MSDepartments';
    console.log('MSDepartments calling delete...');
    console.time(logId);
    try {
      const response = await this.departmentRepository.delete(id);
      console.timeEnd(logId);
      console.log('MSDepartments is responding...');
      return response;
    } catch (error) {
      console.error('Error to delete Department...');
      throw new Error(error);
    }
  }
}
