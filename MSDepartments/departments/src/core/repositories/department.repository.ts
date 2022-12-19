import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { DepartmentDocument } from '../schemas/department.schema';

export abstract class DepartmentRepository {
  abstract create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentDocument>;

  abstract list(): Promise<DepartmentDocument[]>;

  abstract get(id: string): Promise<DepartmentDocument>;

  abstract update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentDocument>;

  abstract delete(id: string): Promise<DepartmentDocument>;
}
