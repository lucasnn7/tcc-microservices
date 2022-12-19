import { Injectable } from '@nestjs/common';
import { ProjectDocument } from '../schemas/project.schema';
import { GetProjectService } from './get-project.service';
import { UpdateProjectService } from './update-project.service';

@Injectable()
export class RecalculateProjectBudgetService {
  constructor(
    private readonly getProjectService: GetProjectService,
    private readonly updateProjectService: UpdateProjectService,
  ) {}

  async execute(idProject: number, budgetToBeDiscover: number, topic: string) {
    const logId = 'MSProjectsRecalculateBudget';
    console.log('MSProjects processing budget recalculation...');
    console.time(logId);
    let projectResponse: ProjectDocument;

    try {
      projectResponse = await this.getProjectService.get(idProject);
    } catch (error) {
      console.error('Error to get Project...');
      throw new Error(error);
    }

    try {
      await this.updateProjectService.update(idProject, {
        onGoingCosts: this.checkTopic(
          topic,
          projectResponse.onGoingCosts,
          budgetToBeDiscover,
        ),
      });
      console.log('MSProjects managed to process the budget recalculation...');
      console.timeEnd(logId);
      return;
    } catch (error) {
      console.error('Error to process the budget recalculation...');
      throw new Error(error);
    }
  }

  private checkTopic = (
    topic: string,
    budget: number,
    valueToBeOperate: number,
  ): number => {
    if (topic === 'DismissEmployeeTopic') return (budget -= valueToBeOperate);
    if (topic === 'AllocateEmployeeTopic') return (budget += valueToBeOperate);
  };
}
