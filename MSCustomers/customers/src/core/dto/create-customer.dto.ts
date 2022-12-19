export class CreateCustomerDto {
  firstName: string;
  lastName: string;
  contractedProject?: number;
  idDoc: string;
  address?: Address;
}

export class Address {
  country: string;
  state: string;
  city: string;
  district: string;
  place: string;
  addressCode: string;
}
