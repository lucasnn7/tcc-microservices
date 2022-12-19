import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from './core/kafka/kafka.module';
import { ProjectsModule } from './core/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongodb:27017/ms-corp-mgmt'),
    ProjectsModule,
    KafkaModule,
  ],
})
export class AppModule {}
