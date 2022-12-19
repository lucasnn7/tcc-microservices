import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { RecalculateProjectBudgetService } from './recalculte-project-budget.service';

@Injectable()
export class AllocateProjectBudgetService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly recalculateProjectBudgetService: RecalculateProjectBudgetService,
  ) {}
  async onModuleInit() {
    try {
      await this.consumerService.consume(
        { topics: ['AllocateEmployeeTopic'] },
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
              const { project, allocatedResources } =
                unwrapKafkaMessage(message);
              return await this.recalculateProjectBudgetService.execute(
                project,
                allocatedResources,
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
      console.error('MSProjects failed to consume AllocateEmployeeTopic...');
      throw new Error(error);
    }
  }
}
