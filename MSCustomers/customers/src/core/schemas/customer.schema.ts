import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  idDoc: string;

  @Prop({ required: false })
  contractedProject?: string[];

  @Prop()
  address?: Address;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
