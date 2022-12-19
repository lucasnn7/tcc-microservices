import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { RecalculateProjectBudgetService } from './recalculte-project-budget.service';

@Injectable()
export class DeallocateProjectBudgetService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly recalculateProjectBudgetService: RecalculateProjectBudgetService,
  ) {}

  async onModuleInit() {
    try {
      await this.consumerService.consume(
        { topics: ['DismissEmployeeTopic'] },
        {
          eachMessage: async ({ topic, partition, message }) => {
            try {
              console.log(
                {
                  value: message.value.toString(),
                  topic: topic.toString(),
                  partition: partition.toString(),
                },
                'MSProjects deallocate budget KafkaConsumer logging...',
              );
              const { idProject, billing } = unwrapKafkaMessage(message);
              return await this.recalculateProjectBudgetService.execute(
                idProject,
                billing,
                topic,
              );
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
      console.error('MSProjects failed to consume DismissEmployeeTopic...');
      throw new Error(error);
    }
  }
}
