import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class ListProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async list(): Promise<ProjectDocument[]> {
    const logId = 'MSProjectsList';
    console.log('MSProjects call list...');
    console.time(logId);
    try {
      const response = await this.projectRepository.list();
      console.timeEnd(logId);
      console.log(`MSProjects is responding: ${response}`);
      return response;
    } catch (error) {
      console.error('Error to list Projects...');
      throw new Error(error);
    }
  }
}
