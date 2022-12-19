import { Injectable, OnModuleInit } from '@nestjs/common';
import { EmployeeStatus } from '../dto/create-employee.dto';
import { ConsumerService } from '../kafka/consumer.service';
import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { UpdateEmployeeService } from './update-employee.service';

@Injectable()
export class DismissEmployeeService implements OnModuleInit {
  constructor(
    private readonly updateEmployeeService: UpdateEmployeeService,
    private readonly consumerService: ConsumerService,
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
                'MSEmployee KafkaConsumer logging...',
              );
              console.log(`message value: ${message.value}`);
              const { idDoc } = unwrapKafkaMessage(message);
              await this.updateEmployeeService.update(idDoc, {
                status: EmployeeStatus.OFF,
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
      console.error('MSEmployees failed to consume DismissEmployeeTopic...');
      throw new Error(error);
    }
  }
}
