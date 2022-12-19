import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const kafkaConfigOptions: ClientProviderOptions = {
  name: 'MS_DEPARTMENTS',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER_URL],
    },
    consumer: {
      groupId: process.env.KAFKA_GROUP_ID,
    },
  },
};
