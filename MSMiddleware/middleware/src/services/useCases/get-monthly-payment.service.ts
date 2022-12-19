import { Injectable } from '@nestjs/common';
import { GetMonthlyPaymentDto } from 'src/dto/get-monthly-payment-dto';
import { MonthlyPaymentResponseDto } from 'src/dto/monthly-payment-response-dto';
import { calculatePayment } from 'src/utils/calculatePayment';
import { businessDay } from '../../utils/businessDay';
import {
  GetEmployeeService,
  GetHolidayService,
  GetProjectService,
} from '../get';

@Injectable()
export class GetMonthlyPaymentService {
  constructor(
    private readonly getEmployeeService: GetEmployeeService,
    private readonly getHolidayService: GetHolidayService,
    private readonly getProjectService: GetProjectService,
  ) {}

  async execute(
    filtersQuery: GetMonthlyPaymentDto,
  ): Promise<MonthlyPaymentResponseDto> {
    const logId = 'middlewareGetMonthlyPayment';
    console.log('middleware calling GetMonthlyPaymentService...');
    console.time(logId);
    const { month, year, employee } = filtersQuery;
    const workingDays = businessDay(month, year);
    let employeeResponse;
    let projectResponse;
    let holidays;

    try {
      employeeResponse = await this.getEmployeeService.get(employee);
    } catch (error) {
      console.error(
        'Error to get employee information on GetMonthlyPaymentService',
      );
      throw new Error(error);
    }

    const { project, firstName, lastName, hourWorked } = employeeResponse;

    try {
      holidays = this.countHolidays(month, year);
    } catch (error) {
      console.error(
        'Error to get holidays information on GetMonthlyPaymentService',
      );
      throw new Error(error);
    }

    try {
      projectResponse = await this.getProjectService.get(project[0]);
    } catch (error) {
      console.error(
        'Error to get project information on GetMonthlyPaymentService',
      );
      throw new Error(error);
    }

    const { name } = projectResponse;

    console.log('middleware managed to get GetMonthlyPaymentService...');
    console.timeEnd(logId);

    return new MonthlyPaymentResponseDto(
      firstName + ' ' + lastName,
      name,
      calculatePayment(hourWorked, workingDays - holidays),
    );
  }

  async countHolidays(month: number, year: number): Promise<number> {
    // TODO
    const days = new Date(year, 1, 1);
    days.setMonth(month - 1);
    const currentMonth = days.getMonth();
    let sumDays: number = 0;
    do {
      if (days.getDay() >= 1 && days.getDay() <= 5) {
        const holiday = await this.getHolidayService.get(days); // should pass the current day as parameter
        if (holiday !== undefined) sumDays++;
      }
      days.setDate(days.getDate() + 1);
    } while (days.getMonth() === currentMonth);
    return sumDays;
  }
}
