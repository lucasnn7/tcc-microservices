import { CreateHolidayDto } from '../dto/create.holiday.dto';
import { UpdateHolidayDto } from '../dto/update.holiday.dto';
import { HolidayDocument } from '../schemas/holiday.schema';

export abstract class HolidayRepository {
  abstract create(createHolidayDto: CreateHolidayDto): Promise<HolidayDocument>;

  abstract list(): Promise<HolidayDocument[]>;

  abstract get(date: string): Promise<HolidayDocument>;

  abstract update(
    date: string,
    updateHolidayDto: UpdateHolidayDto,
  ): Promise<HolidayDocument>;

  abstract delete(date: string): Promise<HolidayDocument>;
}
