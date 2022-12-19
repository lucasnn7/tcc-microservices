import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { UpdateCustomerService } from './update-customer.service';

@Injectable()
export class AssignProjectContractedService implements OnModuleInit {
  constructor(
    private readonly updateCustomerService: UpdateCustomerService,
    private readonly consumerService: ConsumerService,
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
                'MSCustomers KafkaConsumer logging...',
              );
              const { idDoc, dto } = unwrapKafkaMessage(message);
              await this.updateCustomerService.update(idDoc, {
                contractedProject: dto.idProject,
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
        'MSCustomers failed to consume CreateProjectContractTopic...',
      );
      throw new Error(error);
    }
  }
}
