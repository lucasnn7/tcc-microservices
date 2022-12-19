import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
// import { ConsumerService } from '../kafka/consumer.service';
// import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class UpdateEmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository, // private readonly consumerService: ConsumerService,
  ) {}

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const logId = 'MSEmployeesUpdate';
    console.log('MSEmployees calling update...');
    console.time(logId);
    try {
      const response = await this.employeeRepository.update(
        id,
        updateEmployeeDto,
      );
      console.timeEnd(logId);
      console.log('MSEmployees is responding...');
      return response;
    } catch (error) {
      console.error('Error to update Employee...');
      throw new Error(error);
    }
  }

  // async onModuleInit() {
  //   try {
  //     await this.consumerService.consume(
  //       { topics: ['UpdateEmployeeTopic'] },
  //       {
  //         eachMessage: async ({ topic, partition, message }) => {
  //           console.log(
  //             {
  //               value: message.value.toString(),
  //               topic: topic.toString(),
  //               partition: partition.toString(),
  //             },
  //             'MSEmployees KafkaConsumer logging...',
  //           );
  //           const { id, dto } = unwrapKafkaMessage(message);
  //           return await this.update(id, dto);
  //         },
  //       },
  //     );
  //   } catch (error) {
  //     console.error('MSEmployees failed to consume UpdateEmployeeTopic...');
  //     throw new Error(error);
  //   }
  // }
}
