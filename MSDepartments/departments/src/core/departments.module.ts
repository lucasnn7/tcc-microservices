import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsController } from './controllers/rest/departments.controller';
import { KafkaModule } from './kafka/kafka.module';
import { DepartmentRepository } from './repositories/department.repository';
import { MongoDepartmentRepository } from './repositories/mongo.department.repository';
import { Department, DepartmentSchema } from './schemas/department.schema';
import {
  AllocateDepartmentBudgetService,
  CreateDepartmentService,
  DeleteDepartmentService,
  GetDepartmentService,
  ListDepartmentsService,
  RecalculateDepartmentBudgetService,
  UpdateDepartmentService,
} from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
    KafkaModule,
  ],
  controllers: [DepartmentsController],
  providers: [
    AllocateDepartmentBudgetService,
    CreateDepartmentService,
    DeleteDepartmentService,
    GetDepartmentService,
    ListDepartmentsService,
    UpdateDepartmentService,
    RecalculateDepartmentBudgetService,
    {
      provide: DepartmentRepository,
      useClass: MongoDepartmentRepository,
    },
  ],
})
export class DepartmentsModule {}
