import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfigOptions } from './kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice(kafkaConfigOptions);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
