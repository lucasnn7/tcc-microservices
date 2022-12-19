import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './core/customers.module';
import { KafkaModule } from './core/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongodb:27017/ms-corp-mgmt'),
    CustomersModule,
    KafkaModule,
  ],
})
export class AppModule {}
