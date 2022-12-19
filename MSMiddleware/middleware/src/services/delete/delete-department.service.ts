import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class DeleteDepartmentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async delete(id: string) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareDeleteDepartment';
    console.time(logId);
    console.log('middleware calling delete on MSDepartments...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .delete(process.env.MS_DEPARTMENTS + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSDepartments response...');
      return data;
    } catch (error) {
      console.error('Error to delete on MSDepartments...');
      throw new Error(error);
    }
  }
}
