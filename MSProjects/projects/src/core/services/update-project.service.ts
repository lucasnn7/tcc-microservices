import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ConsumerService } from '../kafka/consumer.service';
// import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class UpdateProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) // private readonly consumerService: ConsumerService,
  {}

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    const logId = 'MSProjectsUpdate';
    console.log('MSProjects call update...');
    console.time(logId);
    try {
      const response = await this.projectRepository.update(
        id,
        updateProjectDto,
      );
      console.timeEnd(logId);
      console.log('MSProjects is responding...');
      return response;
    } catch (error) {
      console.error('Error to update Project...');
      throw new Error(error);
    }
  }

  // async onModuleInit() {
  //   await this.consumerService.consume(
  //     { topics: ['UpdateProjectTopic'] },
  //     {
  //       eachMessage: async ({ topic, partition, message }) => {
  //         console.log(
  //           {
  //             value: message.value.toString(),
  //             topic: topic.toString(),
  //             partition: partition.toString(),
  //           },
  //           'MSProjects KafkaConsumer logging...',
  //         );
  //         const { idProject, dto } = unwrapKafkaMessage(message);
  //         return await this.update(idProject, dto);
  //       },
  //     },
  //   );
  // }
}
