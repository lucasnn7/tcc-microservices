import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class GetEmployeeService {
  constructor(private readonly httpService: HttpService) {}

  async get(id: string): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareGetEmployee';
    console.time(logId);
    console.log('middleware calling get on MSEmployees...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(process.env.MS_EMPLOYEES + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSEmployees response...');
      return data;
    } catch (error) {
      console.error('Error to get on MSEmployees...');
      throw new Error(error);
    }
  }
}
