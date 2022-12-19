import { Injectable, OnModuleInit } from '@nestjs/common';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { ConsumerService } from '../kafka/consumer.service';
import { UpdateProjectService } from './update-project.service';

@Injectable()
export class CreateProjectContractService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly updateProjectService: UpdateProjectService,
  ) {}

  async onModuleInit() {
    try {
      await this.consumerService.consume(
        { topics: ['CreateProjectContractTopic'] },
        {
          eachMessage: async ({ topic, partition, message }) => {
            try {
              console.log(
                {
                  value: message.value.toString(),
                  topic: topic.toString(),
                  partition: partition.toString(),
                },
                'MSProjects create contract KafkaConsumer logging...',
              );
              const { idProject, billing } = unwrapKafkaMessage(message);
              await this.updateProjectService.update(idProject, {
                expectedBilling: billing,
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
      console.error(
        'MSProjects failed to consume CreateProjectContractTopic...',
      );
      throw new Error(error);
    }
  }
}
