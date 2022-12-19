import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer.service';
// import { DeleteEmployeeService } from '../delete';
import { GetEmployeeService } from '../get';
import { GetMonthlyPaymentService } from './get-monthly-payment.service';

@Injectable()
export class DismissEmployeeService {
  constructor(
    private readonly getEmployeeService: GetEmployeeService,
    // private readonly deleteEmployeeService: DeleteEmployeeService,
    private readonly getMonthlyPaymentService: GetMonthlyPaymentService,
    private readonly producerService: ProducerService,
  ) {}

  async execute(idEmployee: string) {
    const logId = 'middlewareDismissEmployee';
    console.log('middleware processing DismissEmployee...');
    console.time(logId);

    let employeeResponse;
    let paymentResponse;

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

    const message = {
      idEmployee,
      resourceToBeReleased: paymentResponse.payment,
      project: employeeResponse.project,
    };

    try {
      await this.producerService.produce({
        topic: 'DismissEmployeeTopic',
        messages: [{ value: JSON.stringify(message) }],
      });

      console.log('middleware managed produce message to DismissEmployee...');
      console.timeEnd(logId);
      return `Employee: ${idEmployee}. dismiss with success`;
    } catch (error) {
      console.error('Error to produce message to DismissEmployee...');
      throw new Error(error);
    }
  }
}
