import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService {
  constructor(
    @Inject('MS_MIDDLEWARE')
    private readonly clientKafka: ClientKafka,
  ) {}

  async emit(topic: string, message: any) {
    this.clientKafka.emit(topic, message);

    return { topic, message };
  }
}
