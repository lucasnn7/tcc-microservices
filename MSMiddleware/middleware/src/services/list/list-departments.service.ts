import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class ListDepartmentsService {
  constructor(private readonly httpService: HttpService) {}

  async list(): Promise<any> {
    const axiosConfig = axiosReqConfig;
    const logId = 'middlewareListDepartments';
    console.time(logId);
    console.log('middleware calling list on MSDepartments...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(process.env.MS_DEPARTMENTS, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSDepartments response...');
      return data;
    } catch (error) {
      console.error('Error to list on MSDepartments...');
      throw new Error(error);
    }
  }
}
