import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { RecalculateDepartmentBudgetService } from './recalculte-department-budget.service';

@Injectable()
export class AllocateDepartmentBudgetService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly recalculateDepartmentBudgetService: RecalculateDepartmentBudgetService,
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
                'MSDepartments KafkaConsumer logging...',
              );
              const { department, allocatedResources } =
                unwrapKafkaMessage(message);
              await this.recalculateDepartmentBudgetService.execute(
                department,
                allocatedResources,
              );
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
      console.error('MSDepartments failed to consume AllocateProjectTopic');
      throw new Error(error);
    }
  }
}
