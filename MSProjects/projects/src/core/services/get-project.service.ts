import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class GetProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async get(id: number): Promise<ProjectDocument> {
    const logId = 'MSProjectsGet';
    console.log('MSProjects call get...');
    console.time(logId);
    try {
      const response = await this.projectRepository.get(id);
      console.timeEnd(logId);
      console.log(`MSProjects is responding: ${response}`);
      return response;
    } catch (error) {
      console.error('Error to get Project...');
      throw new Error(error);
    }
  }
}
