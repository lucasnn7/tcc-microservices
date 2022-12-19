import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHolidayDto } from '../dto/create.holiday.dto';
import { UpdateHolidayDto } from '../dto/update.holiday.dto';
import { Holiday, HolidayDocument } from '../schemas/holiday.schema';
import { HolidayRepository } from './holiday.repository';

@Injectable()
export class MongoHolidayRepository extends HolidayRepository {
  constructor(
    @InjectModel(Holiday.name) private holidayModel: Model<HolidayDocument>,
  ) {
    super();
  }

  async create(createHolidayDto: CreateHolidayDto): Promise<HolidayDocument> {
    const createdHoliday = new this.holidayModel(createHolidayDto);
    console.log(createdHoliday, 'CREATED OBJ<');
    return createdHoliday.save();
  }

  async list(): Promise<HolidayDocument[]> {
    return this.holidayModel.find().exec();
  }

  async get(date: string): Promise<HolidayDocument> {
    return this.holidayModel.findOne({ date: date });
  }

  async update(
    date: string,
    updateHolidayDto: UpdateHolidayDto,
  ): Promise<HolidayDocument> {
    return this.holidayModel
      .findOneAndUpdate({ date: date }, updateHolidayDto)
      .exec();
  }

  async delete(date: string): Promise<HolidayDocument> {
    return this.holidayModel.findOneAndRemove({ date: date }).exec();
  }
}
