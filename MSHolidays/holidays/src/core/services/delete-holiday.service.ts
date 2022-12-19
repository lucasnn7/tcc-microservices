import { Injectable } from '@nestjs/common';
import { HolidayRepository } from '../repositories/holiday.repository';
import { HolidayDocument } from '../schemas/holiday.schema';

@Injectable()
export class DeleteHolidayService {
  constructor(private readonly holidayRepository: HolidayRepository) {}

  async delete(id: string): Promise<HolidayDocument> {
    const logId = 'MSHolidaysDelete';
    console.log('MSHolidays calling delete...');
    console.time(logId);
    try {
      const response = await this.holidayRepository.delete(id);
      console.timeEnd(logId);
      console.log('MSHolidays is responding...');
      return response;
    } catch (error) {
      console.error('Error to delete Holiday...');
      throw new Error(error);
    }
  }
}
