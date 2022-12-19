import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class CreateProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    const logId = 'MSProjectsPost';
    console.log('MSProjects call post...');
    console.time(logId);
    try {
      const response = await this.projectRepository.create(createProjectDto);
      console.timeEnd(logId);
      console.log('MSProjects is responding...');
      return response;
    } catch (error) {
      console.error('Error to create a new Project...');
      throw new Error(error);
    }
  }
}
