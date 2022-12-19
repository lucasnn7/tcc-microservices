import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class UpdateEmployeeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    axiosConfig.data = updateEmployeeDto;
    const logId = 'middlewareUpdateEmployee';
    console.time(logId);
    console.log('middleware calling update on MSEmployees...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .patch(
            process.env.MS_EMPLOYEES + `/:id`,
            updateEmployeeDto,
            axiosConfig,
          )
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSEmployees response...');
      return data;
    } catch (error) {
      console.error('Error to update on MSEmployees...');
      throw new Error(error);
    }
  }

  async updateWithKafka(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const logId = 'middlewareUpdateEmployee';
    console.log('middleware producing update message to MSEmployees...');
    const message = { id: id, dto: updateEmployeeDto };
    console.time(logId);
    try {
      await this.producerService.produce({
        topic: 'UpdateEmployeeTopic',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.timeEnd(logId);
      console.log(
        'middleware managed to produce update message to MSEmployees...',
      );
      return { message };
    } catch (error) {
      console.error('Error to produce update message to MSEmployees...');
      throw new Error(error);
    }
  }
}
