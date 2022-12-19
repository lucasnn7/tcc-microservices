import { Injectable } from '@nestjs/common';
import { HolidayRepository } from '../repositories/holiday.repository';
import { HolidayDocument } from '../schemas/holiday.schema';

@Injectable()
export class GetHolidayService {
  constructor(private readonly holidayRepository: HolidayRepository) {}

  async get(id: string): Promise<HolidayDocument> {
    const logId = 'MSHolidaysGet';
    console.log('MSHolidays calling get...');
    console.time(logId);
    try {
      const response = await this.holidayRepository.get(id);
      console.timeEnd(logId);
      console.log('MSHolidays is responding...');
      return response;
    } catch (error) {
      console.error('Error to get Holiday...');
      throw new Error(error);
    }
  }
}
