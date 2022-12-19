import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { CreateDepartmentDto } from 'src/dto/create-department.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class CreateDepartmentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = createDepartmentDto;
    const logId = 'middlewarePostDepartment';
    console.log('middleware calling post on MSDepartments...');
    console.time(logId);
    try {
      const data = await lastValueFrom(
        this.httpService
          .post(process.env.MS_DEPARTMENTS, createDepartmentDto)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSDepartments response...');
      return data;
    } catch (error) {
      console.error('Error to post on MSDepartments...');
      throw new Error(error);
    }
  }

  async createWithList(
    createDepartmentDto: CreateDepartmentDto[],
  ): Promise<any[]> {
    const axiosConfig = axiosReqConfig;
    const results = [];
    const logId = 'middlewarePostDepartment';
    console.time(logId);
    console.log('middleware calling post on MSDepartments...');
    try {
      createDepartmentDto.forEach(async (item: CreateDepartmentDto) => {
        axiosConfig.params = item;
        const data = await lastValueFrom(
          this.httpService
            .post(process.env.MS_DEPARTMENTS, item)
            .pipe(map((response) => response.data)),
        );
        results.push(data);
      });
      console.timeEnd(logId);
      console.log('middleware got MSDepartments response...');
      return results;
    } catch (error) {
      console.error('Error to post on MSDepartments...');
      throw new Error(error);
    }
  }
}
