import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HolidaysModule } from './core/holidays.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongodb:27017/ms-corp-mgmt'),
    HolidaysModule,
  ],
})
export class AppModule {}
