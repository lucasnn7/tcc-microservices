import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { KafkaProducerService } from './kafka/kafka-producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kafka: KafkaProducerService,
  ) {}

  @Get()
  async getHello() {
    // const topic = 'MyTestTopic';
    // const message = { foo: 'bar' };
    // console.log(process.env.KAFKA_CLIENT_ID);
    // console.log(process.env.KAFKA_BROKER_URL);
    // await this.kafka.emit(topic, message);
    // return { topic, message };
    const resp: CreateCustomerDto = {
      firstName: 'testing the update',
      lastName: 'through the kafka message',
      contractedProject: 3,
      idDoc: 'aibf',
      address: {
        country: 'jafj',
        state: 'KSJ',
        city: 'ofah',
        district: 'pfjapf',
        place: 'jfj',
        addressCode: 'jfahf3',
      },
    };
    return await this.appService.getHello('aibf', resp);
  }
}
