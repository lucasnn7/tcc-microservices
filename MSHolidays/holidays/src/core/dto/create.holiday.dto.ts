export class CreateHolidayDto {
  name: string;
  date: string;
  type?: HolidayType;
  regions?: State[];
}

export enum HolidayType {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
}

export enum State {
  MG = 'MG',
  SP = 'SP',
  RJ = 'RJ',
  BA = 'BA',
  CE = 'CE',
  RS = 'RS',
  PR = 'PR',
}
