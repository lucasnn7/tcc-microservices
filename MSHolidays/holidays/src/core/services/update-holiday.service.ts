import { Injectable } from '@nestjs/common';
import { UpdateHolidayDto } from '../dto/update.holiday.dto';
import { HolidayRepository } from '../repositories/holiday.repository';
import { HolidayDocument } from '../schemas/holiday.schema';

@Injectable()
export class UpdateHolidayService {
  constructor(private readonly holidayRepository: HolidayRepository) {}

  async update(
    id: string,
    updateHolidayDto: UpdateHolidayDto,
  ): Promise<HolidayDocument> {
    const logId = 'MSHolidaysUpdate';
    console.log('MSHolidays calling update...');
    console.time(logId);
    try {
      const response = await this.holidayRepository.update(
        id,
        updateHolidayDto,
      );
      console.timeEnd(logId);
      console.log('MSHolidays is responding...');
      return response;
    } catch (error) {
      console.error('Error to update Holiday...');
      throw new Error(error);
    }
  }
}
