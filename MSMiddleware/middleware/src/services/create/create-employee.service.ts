import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class CreateEmployeeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = createEmployeeDto;
    const logId = 'middlewarePostEmployee';
    console.log('middleware calling post on MSEmployees...');
    console.time(logId);
    try {
      const data = await lastValueFrom(
        this.httpService
          .post(process.env.MS_EMPLOYEES, createEmployeeDto, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSEmployees response...');
      return data;
    } catch (error) {
      console.error('Error to post on MSEmployees...');
      throw new Error(error);
    }
  }

  async createWithList(createEmployeeDto: CreateEmployeeDto[]): Promise<any[]> {
    const axiosConfig = axiosReqConfig;
    const results = [];
    const logId = 'middlewarePostEmployee';
    console.time(logId);
    console.log('middleware calling post on MSEmployees...');
    try {
      createEmployeeDto.forEach(async (item: CreateEmployeeDto) => {
        axiosConfig.params = item;
        const data = await lastValueFrom(
          this.httpService
            .post(process.env.MS_EMPLOYEES, item, axiosConfig)
            .pipe(map((response) => response.data)),
        );
        results.push(data);
      });
      console.timeEnd(logId);
      console.log('middleware got MSEmployees response...');
      return results;
    } catch (error) {
      console.error('Error to post on MSEmployees...');
      throw new Error(error);
    }
  }
}
