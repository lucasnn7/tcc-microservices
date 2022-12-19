import { UpdateCustomerDto } from "../dto/update-customer.dto";

export const unwrapKafkaMessage = (message: any): any => {
    const m = JSON.parse(message.value.toString());
    const id: string = m.id;
    const dto: UpdateCustomerDto = m.dto;
    return { id, dto };
  }