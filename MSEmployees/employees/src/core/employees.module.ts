import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from './controllers/rest/employees.controller';
import { KafkaModule } from './kafka/kafka.module';
import { EmployeeRepository } from './repositories/employee.repository';
import { MongoEmployeeRepository } from './repositories/mongo.employee.repository';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import {
  AllocateEmployeeService,
  CreateEmployeeService,
  DeleteEmployeeService,
  DismissEmployeeService,
  GetEmployeeService,
  ListEmployeesService,
  UpdateEmployeeService,
} from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    KafkaModule,
  ],
  controllers: [EmployeesController],
  providers: [
    AllocateEmployeeService,
    CreateEmployeeService,
    DeleteEmployeeService,
    DismissEmployeeService,
    GetEmployeeService,
    ListEmployeesService,
    UpdateEmployeeService,
    {
      provide: EmployeeRepository,
      useClass: MongoEmployeeRepository,
    },
  ],
})
export class EmployeesModule {}
