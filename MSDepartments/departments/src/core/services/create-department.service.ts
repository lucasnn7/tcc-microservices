import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { DepartmentRepository } from '../repositories/department.repository';
import { DepartmentDocument } from '../schemas/department.schema';

@Injectable()
export class CreateDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentDocument> {
    const logId = 'MSDepartmentsPost';
    console.log('MSDepartments calling post...');
    console.time(logId);
    try {
      const response = await this.departmentRepository.create(
        createDepartmentDto,
      );
      console.timeEnd(logId);
      console.log('MSDepartments is responding...');
      return response;
    } catch (error) {
      console.error('Error to create a new Department...');
      throw new Error(error);
    }
  }
}
