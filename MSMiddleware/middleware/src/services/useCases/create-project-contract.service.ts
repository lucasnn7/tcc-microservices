import { Injectable } from '@nestjs/common';
import { CreateProjectContractDto } from 'src/dto/create-project-contract.dto';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class CreateProjectContractService {
  constructor(private readonly producerService: ProducerService) {}

  async execute(createProjectContractDto: CreateProjectContractDto) {
    const logId = 'middlewareCreateProjectContract';
    console.log('middleware producing message to CreateProjectContract');
    console.time(logId);
    try {
      await this.producerService.produce({
        topic: 'CreateProjectContractTopic',
        messages: [{ value: JSON.stringify(createProjectContractDto) }],
      });
      console.timeEnd(logId);
      console.log(
        'middleware managed to produce message to CreateProjectContract...',
      );
      return { createProjectContractDto };
    } catch (error) {
      console.error('Error to produce message to CreateProjectContract...');
      throw new Error(error);
    }
  }
}
