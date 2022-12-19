export class CreateProjectDto {
  name: string;
  idProject: string;
  description: string;
  state?: ProjectStatus;
  dateStart: string;
  dateUpdate?: string;
  deliveryDate: string;
  updates?: string[];
  expectedBilling: number;
  onGoingCosts: number;
  department?: string;
}

export enum ProjectStatus {
  CREATED = 'CREATED',
  ANALYSIS = 'ANALYSIS',
  DEVELOP = 'DEVELOP',
  TEST = 'TEST',
  VALIDATION = 'VALIDATION',
  DELIVERED = 'DELIVERED',
}
