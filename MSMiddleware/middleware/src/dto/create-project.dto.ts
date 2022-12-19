import { ProjectStatus } from 'src/enums/ProjectStatus';

export class CreateProjectDto {
  name: string;
  idProject: number;
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
