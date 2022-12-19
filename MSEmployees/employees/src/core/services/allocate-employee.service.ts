import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { UpdateEmployeeService } from './update-employee.service';

@Injectable()
export class AllocateEmployeeService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly updateEmployeeService: UpdateEmployeeService,
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
                'MSEmployee KafkaConsumer logging...',
              );
              const { idDoc, project } = unwrapKafkaMessage(message);
              await this.updateEmployeeService.update(idDoc, {
                project: project,
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
      console.error('MSEmployees failed to consume AllocateEmployeeTopic...');
      throw new Error(error);
    }
  }
}
