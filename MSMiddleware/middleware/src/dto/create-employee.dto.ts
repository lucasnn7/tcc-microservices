import { EmployeeStatus } from 'src/enums/EmployeeStatus';
import { Address } from './address.dto';
import { Dependent } from './dependent.dto';

export class CreateEmployeeDto {
  firstName: string;
  lastName: string;
  idDoc: string;
  birthDay: string;
  addmissionDate: string;
  address?: Address;
  profesion: string;
  hourWorked: number;
  workingDay: number;
  dependents?: Dependent[];
  status?: EmployeeStatus;
  project?: number;
}
