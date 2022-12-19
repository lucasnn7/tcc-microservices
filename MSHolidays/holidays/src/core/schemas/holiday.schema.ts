import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HolidayType, State } from '../dto/create.holiday.dto';
import { Document } from 'mongoose';

export type HolidayDocument = Holiday & Document;

@Schema()
export class Holiday {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: string;

  @Prop()
  type?: HolidayType;

  @Prop()
  regions?: State[];
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);
