import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class DeleteEmployeeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async delete(id: string) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareDeleteEmployee';
    console.time(logId);
    console.log('middleware calling delete on MSEmployees...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .delete(process.env.MS_EMPLOYEES + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSEmployees response...');
      return data;
    } catch (error) {
      console.error('Error to delete on MSEmployees...');
      throw new Error(error);
    }
  }

  async dismissWithKafka(id: string, budget: number, project: number) {
    const logId = 'middlewareDismissEmployee';
    console.log('middleware producing dismiss Employee message...');
    console.time(logId);
    const message = {
      idEmployee: id,
      resourceToBeReleased: budget,
      project: project,
    };
    try {
      await this.producerService.produce({
        topic: 'DismissEmployeeTopic',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.timeEnd(logId);
      console.log('middleware managed to produce dismiss Employee message...');
      return { message };
    } catch (error) {
      console.error('Error to produce dismiss Employee message...');
      throw new Error(error);
    }
  }
}
