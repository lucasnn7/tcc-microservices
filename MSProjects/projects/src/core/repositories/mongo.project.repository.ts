import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { ProjectRepository } from './project.repository';

@Injectable()
export class MongoProjectRepository extends ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {
    super();
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    const createdProject = new this.projectModel(createProjectDto);
    console.log(createdProject, 'CREATED OBJ');
    return await createdProject.save();
  }

  async list(): Promise<ProjectDocument[]> {
    return await this.projectModel.find().exec();
  }

  async get(id: number): Promise<ProjectDocument> {
    return await this.projectModel.findOne({ idProject: id }).exec();
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<ProjectDocument> {
    return await this.projectModel
      .findOneAndUpdate({ idProject: id }, updateProjectDto)
      .exec();
  }

  async delete(id: number): Promise<ProjectDocument> {
    return await this.projectModel.findOneAndDelete({ idProject: id }).exec();
  }
}
