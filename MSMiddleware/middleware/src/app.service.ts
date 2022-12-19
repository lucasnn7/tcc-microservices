import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello(id: string, up: UpdateCustomerDto) {
    const message = { id: id, dto: up };
    await this.producerService.produce({
      topic: 'UpdateCustomerTopic',
      messages: [{ value: JSON.stringify(message) }],
    });
    return { message };
  }
}
