import { Injectable } from '@nestjs/common';
import { HolidayRepository } from '../repositories/holiday.repository';
import { HolidayDocument } from '../schemas/holiday.schema';

@Injectable()
export class ListHolidaysService {
  constructor(private readonly holidayRepository: HolidayRepository) {}

  async list(): Promise<HolidayDocument[]> {
    const logId = 'MSHolidaysList';
    console.log('MSHolidays calling list...');
    console.time(logId);
    try {
      const response = await this.holidayRepository.list();
      console.timeEnd(logId);
      console.log('MSHolidays is responding...');
      return response;
    } catch (error) {
      console.error('Error to list Holidays...');
      throw new Error(error);
    }
  }
}
