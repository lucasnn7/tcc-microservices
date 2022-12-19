import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HolidaysController } from './holidays.controller';
import { Holiday, HolidaySchema } from './schemas/holiday.schema';
import { HolidayRepository } from './repositories/holiday.repository';
import { MongoHolidayRepository } from './repositories/mongo.holiday.repository';
import {
  CreateHolidayService,
  DeleteHolidayService,
  GetHolidayService,
  ListHolidaysService,
  UpdateHolidayService,
} from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Holiday.name, schema: HolidaySchema }]),
  ],
  controllers: [HolidaysController],
  providers: [
    CreateHolidayService,
    DeleteHolidayService,
    GetHolidayService,
    ListHolidaysService,
    UpdateHolidayService,
    {
      provide: HolidayRepository,
      useClass: MongoHolidayRepository,
    },
  ],
})
export class HolidaysModule {}
