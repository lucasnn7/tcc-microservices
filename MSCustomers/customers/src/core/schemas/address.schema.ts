import { Prop } from "@nestjs/mongoose";

export class Address {
    @Prop()
    country: string;
  
    @Prop()
    state: string;
  
    @Prop()
    city: string;
  
    @Prop()
    district: string;
  
    @Prop()
    place: string;
  
    @Prop()
    addressCode: string;
  }