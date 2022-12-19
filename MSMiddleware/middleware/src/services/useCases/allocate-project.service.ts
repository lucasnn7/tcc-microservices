import { Injectable } from '@nestjs/common';
import { AllocateProjectDto } from 'src/dto/allocate-project.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { GetDepartmentService, GetProjectService } from '../get';

@Injectable()
export class AllocateProjectService {
  constructor(
    private readonly getProjectService: GetProjectService,
    private readonly getDepartmentService: GetDepartmentService,
    private readonly producerService: ProducerService,
  ) {}

  async execute(allocateProjectDto: AllocateProjectDto) {
    const logId = 'middlewareAllocateProject';
    console.log('middleware processing AllocateProject...');
    console.time(logId);
    const { idProject, idDepartment } = allocateProjectDto;
    let departmentResponse;
    let projectResponse;

    try {
      console.log('middleware calling GetProjectService...');
      projectResponse = await this.getProjectService.get(idProject);
    } catch (error) {
      console.error('Error to call GetProjectService...');
      throw new Error(error);
    }

    try {
      console.log('middleware calling GetDepartmentService...');
      departmentResponse = await this.getDepartmentService.get(idDepartment);
    } catch (error) {
      console.error('Error to call GetDepartmentService...');
      throw new Error(error);
    }

    if (departmentResponse.budget > projectResponse.onGoingCosts) {
      const message = {
        project: idProject,
        department: departmentResponse.name,
        allocatedResources: projectResponse.onGoingCosts,
      };
      await this.producerService.produce({
        topic: 'AllocateProjectTopic',
        messages: [{ value: JSON.stringify(message) }],
      });

      console.log('middleware managed produce message to AllocateProject...');
      console.timeEnd(logId);
      return `Project: ${idProject}. allocate message produce with success`;
    } else {
      console.error(
        `Impossible to allocate project: ${idProject}. Department budget: ${idDepartment} less than expected expenses.`,
      );
      return;
    }
  }
}
