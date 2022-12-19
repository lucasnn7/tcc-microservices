import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './controllers/rest/projects.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectRepository } from './repositories/project.repository';
import { MongoProjectRepository } from './repositories/mongo.project.repository';
import {
  AllocateProjectBudgetService,
  AllocateProjectService,
  CreateProjectContractService,
  CreateProjectService,
  DeallocateProjectBudgetService,
  DeleteProjectService,
  GetProjectService,
  ListProjectsService,
  RecalculateProjectBudgetService,
  UpdateProjectService,
} from './services';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    KafkaModule,
  ],
  controllers: [ProjectsController],
  providers: [
    AllocateProjectBudgetService,
    AllocateProjectService,
    CreateProjectService,
    CreateProjectContractService,
    DeallocateProjectBudgetService,
    DeleteProjectService,
    GetProjectService,
    ListProjectsService,
    RecalculateProjectBudgetService,
    UpdateProjectService,
    {
      provide: ProjectRepository,
      useClass: MongoProjectRepository,
    },
  ],
})
export class ProjectsModule {}
