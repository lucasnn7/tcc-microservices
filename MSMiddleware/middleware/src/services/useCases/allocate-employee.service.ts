import { Injectable } from '@nestjs/common';
import { AllocateEmployeeDto } from 'src/dto/allocate-employee.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { GetEmployeeService, GetProjectService } from '../get';
import { GetMonthlyPaymentService } from './get-monthly-payment.service';

@Injectable()
export class AllocateEmployeeService {
  constructor(
    private readonly getEmployeeService: GetEmployeeService,
    private readonly getMonthlyPaymentService: GetMonthlyPaymentService,
    private readonly getProjectService: GetProjectService,
    private readonly producerService: ProducerService,
  ) {}

  async execute(allocateEmployeeDto: AllocateEmployeeDto) {
    const logId = 'middlewareAllocateEmployee';
    console.log('middleware processing AllocateEmployee...');
    console.time(logId);
    const { idEmployee, idProject } = allocateEmployeeDto;
    let employeeResponse;
    let paymentResponse;
    let projectResponse;

    try {
      console.log('middleware calling GetEmployeeService...');
      employeeResponse = await this.getEmployeeService.get(idEmployee);
    } catch (error) {
      console.error('Error to call GetEmployeeService...');
      throw new Error(error);
    }

    try {
      console.log('middleware calling GetMonthlyPaymentService...');
      paymentResponse = await this.getMonthlyPaymentService.execute({
        month: 5,
        year: 2022,
        employee: idEmployee,
      });
    } catch (error) {
      console.error('Error to call GetMonthlyPaymentService...');
      throw new Error(error);
    }

    try {
      console.log('middleware calling GetProjectService...');
      projectResponse = await this.getProjectService.get(idProject);
    } catch (error) {
      console.error('Error to call GetProjectService...');
      throw new Error(error);
    }

    if (paymentResponse.payment < projectResponse.expectedBilling) {
      try {
        const message = {
          allocatedResources: paymentResponse.payment,
          project: employeeResponse.project,
        };
        await this.producerService.produce({
          topic: 'AllocateEmployeeTopic',
          messages: [{ value: JSON.stringify(message) }],
        });
        console.log(
          'middleware managed produce message to AllocateEmployee...',
        );
        console.timeEnd(logId);
        return `Employee: ${idEmployee}. allocated with success`;
      } catch (error) {
        console.error('Error to produce message to update Employee...');
        throw new Error(error);
      }
    } else {
      console.error(
        `Impossible to allocate employee: ${idEmployee}. Project budget: ${idProject} less than expected expenses.`,
      );
      return;
    }
  }
}
