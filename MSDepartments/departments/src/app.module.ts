import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from './core/departments.module';
import { KafkaModule } from './core/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongodb:27017/ms-corp-mgmt'),
    DepartmentsModule,
    KafkaModule,
  ],
})
export class AppModule {}
