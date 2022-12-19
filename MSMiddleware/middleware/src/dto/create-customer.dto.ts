import { Address } from "./address.dto";

export class CreateCustomerDto {
    firstName: string;
    lastName: string;
    contractedProject?: number;
    idDoc: string;
    address?: Address;
}