import { Injectable } from '@nestjs/common';
import { CreateHolidayDto } from '../dto/create.holiday.dto';
import { HolidayRepository } from '../repositories/holiday.repository';
import { HolidayDocument } from '../schemas/holiday.schema';

@Injectable()
export class CreateHolidayService {
  constructor(private readonly holidayRepository: HolidayRepository) {}

  async create(createHolidayDto: CreateHolidayDto): Promise<HolidayDocument> {
    const logId = 'MSHolidaysPost';
    console.log('MSHolidays calling post...');
    console.time(logId);
    try {
      const response = await this.holidayRepository.create(createHolidayDto);
      console.timeEnd(logId);
      console.log('MSHolidays is responding...');
      return response;
    } catch (error) {
      console.error('Error to create a new Holiday...');
      throw new Error(error);
    }
  }
}
