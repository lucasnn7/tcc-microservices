import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class DeleteProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async delete(id: number): Promise<ProjectDocument> {
    const logId = 'MSProjectsDelete';
    console.log('MSProjects call delete...');
    console.time(logId);
    try {
      const response = await this.projectRepository.delete(id);
      console.timeEnd(logId);
      console.log('MSProjects is responding...');
      return response;
    } catch (error) {
      console.error('Error to delete Project...');
      throw new Error(error);
    }
  }
}
