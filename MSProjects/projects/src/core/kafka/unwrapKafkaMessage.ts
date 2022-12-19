import { UpdateProjectDto } from '../dto/update-project.dto';

export const unwrapKafkaMessage = (message: any): any => {
  const m = JSON.parse(message.value.toString());
  const id: string = m.id;
  const dto: UpdateProjectDto = m.dto;
  return { id, dto };
};
