import { Injectable } from '@nestjs/common';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
// import { ConsumerService } from '../kafka/consumer.service';
// import { unwrapKafkaMessage } from '../kafka/unwrapKafkaMessage';
import { DepartmentRepository } from '../repositories/department.repository';
import { DepartmentDocument } from '../schemas/department.schema';

@Injectable()
export class UpdateDepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
  ) // private readonly consumerService: ConsumerService,
  {}

  async update(
    id: string,
    updateCustomerDto: UpdateDepartmentDto,
  ): Promise<DepartmentDocument> {
    const logId = 'MSDepartmentsUpdate';
    console.log('MSDepartments calling update...');
    console.time(logId);
    try {
      const response = await this.departmentRepository.update(
        id,
        updateCustomerDto,
      );
      console.timeEnd(logId);
      console.log('MSDepartments is responding...');
      return response;
    } catch (error) {
      console.error('Error to update Department...');
      throw new Error(error);
    }
  }

  // async onModuleInit() {
  //   try {
  //     await this.consumerService.consume(
  //       { topics: ['UpdateDepartmentTopic'] },
  //       {
  //         eachMessage: async ({ topic, partition, message }) => {
  //           console.log(
  //             {
  //               value: message.value.toString(),
  //               topic: topic.toString(),
  //               partition: partition.toString(),
  //             },
  //             'MSDepartments KafkaConsumer logging...',
  //           );
  //           const { id, dto } = unwrapKafkaMessage(message);
  //           return await this.update(id, dto);
  //         },
  //       },
  //     );
  //   } catch (error) {
  //     console.error('MSDepartments failed to consume UpdateDepartmentTopic');
  //     throw new Error(error);
  //   }
  // }
}
