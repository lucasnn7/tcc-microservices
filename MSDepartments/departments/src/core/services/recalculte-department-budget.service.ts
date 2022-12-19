import { Injectable } from '@nestjs/common';
import { GetDepartmentService } from './get-department.service';
import { UpdateDepartmentService } from './update-department.service';

@Injectable()
export class RecalculateDepartmentBudgetService {
  constructor(
    private readonly getDepartmentService: GetDepartmentService,
    private readonly updateDepartmentService: UpdateDepartmentService,
  ) {}

  async execute(id: string, budgetToBeDiscounted: number) {
    const logId = 'MSDepartmentsRecalculateBudget';
    console.log('MSDepartments calling recalculate buget...');
    console.time(logId);
    try {
      const department = await this.getDepartmentService.get(id);
      console.log('MSDepartments managed to recalculate buget...');
      console.timeEnd(logId);
      return await this.updateDepartmentService.update(id, {
        budget: department.budget - budgetToBeDiscounted,
      });
    } catch (error) {
      console.error(
        'Error to get department on RecalculateDepartmentBudget...',
      );
      throw new Error(error);
    }
  }
}
