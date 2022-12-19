import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department, DepartmentDocument } from '../schemas/department.schema';
import { DepartmentRepository } from './department.repository';

@Injectable()
export class MongoDepartmentRepository extends DepartmentRepository {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {
    super();
  }

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentDocument> {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    console.log(createdDepartment, 'CREATED OBJ<');
    return createdDepartment.save();
  }

  async list(): Promise<DepartmentDocument[]> {
    return this.departmentModel.find().exec();
  }

  async get(id: string): Promise<DepartmentDocument> {
    return this.departmentModel.findOne({ name: id }).exec();
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentDocument> {
    return this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto);
  }

  async delete(id: string): Promise<DepartmentDocument> {
    return this.departmentModel.findByIdAndRemove(id).exec();
  }
}
