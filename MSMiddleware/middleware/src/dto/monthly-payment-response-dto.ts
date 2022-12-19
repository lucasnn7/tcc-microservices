export class MonthlyPaymentResponseDto {
  employee: string;
  project: string;
  payment: number;

  constructor(employee: string, project: string, payment: number) {
    this.employee = employee;
    this.project = project;
    this.payment = payment;
  }
}
