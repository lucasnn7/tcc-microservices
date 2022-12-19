import { UpdateDepartmentDto } from '../dto/update-department.dto';

export const unwrapKafkaMessage = (message: any): any => {
  const m = JSON.parse(message.value.toString());
  const id: string = m.id;
  const dto: UpdateDepartmentDto = m.dto;
  return { id, dto };
};
