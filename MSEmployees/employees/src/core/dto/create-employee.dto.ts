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

export class Address {
  country: string;
  state: string;
  city: string;
  district: string;
  place: string;
  addressCode: string;
}

export class Dependent {
  firstName: string;
  lastName: string;
  birthDay: Date;
  address: Address;
  affiliation: string;
}

export enum EmployeeStatus {
  ON = 'ON',
  OFF = 'OFF',
  VACATION = 'VACATION',
}
