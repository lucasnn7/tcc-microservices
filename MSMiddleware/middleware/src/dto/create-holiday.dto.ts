import { HolidayType } from "src/enums/HolidayType";
import { State } from "src/enums/State";

export class CreateHolidayDto {
    name: string;
    date: string;
    type?: HolidayType;
    regions?: State[]
}