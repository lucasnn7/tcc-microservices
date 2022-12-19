import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { UpdateProjectService } from './update-project.service';

@Injectable()
export class AllocateProjectService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly updateProjectService: UpdateProjectService,
  ) {}

  async onModuleInit() {
    try {
      await this.consumerService.consume(
        { topics: ['AllocateProjectTopic'] },
        {
          eachMessage: async ({ topic, partition, message }) => {
            try {
              console.log(
                {
                  value: message.value.toString(),
                  topic: topic.toString(),
                  partition: partition.toString(),
                },
                'MSProjects allocate budget KafkaConsumer logging...',
              );
              const { idProject, department } = unwrapKafkaMessage(message);
              await this.updateProjectService.update(idProject, {
                department: department,
              });
              return;
            } catch (error) {
              console.error(
                'Failed to process the topic. It is likely that there are no topics to be consumed. ',
              );
              throw new Error(error);
            }
          },
        },
      );
    } catch (error) {
      console.error('MSProjects failed to consume AllocateProjectTopic...');
      throw new Error(error);
    }
  }
}
