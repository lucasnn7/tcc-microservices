import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address, Dependent, EmployeeStatus } from '../dto/create-employee.dto';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthDay: string;

  @Prop({ required: true })
  idDoc: string;

  @Prop()
  addmissionDate: string;

  @Prop()
  address?: Address;

  @Prop()
  profesion: string;

  @Prop()
  hourWorked: number;

  @Prop()
  workingDay: number;

  @Prop()
  dependents?: Dependent[];

  @Prop()
  status?: EmployeeStatus;

  @Prop({ required: false })
  project?: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
