import { UpdateEmployeeDto } from '../dto/update-employee.dto';

export const unwrapKafkaMessage = (message: any): any => {
  const m = JSON.parse(message.value.toString());
  const id: string = m.id;
  const dto: UpdateEmployeeDto = m.dto;
  return { id, dto };
};
