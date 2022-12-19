import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class ListHolidaysService {
  constructor(private readonly httpService: HttpService) {}

  async list(): Promise<any> {
    const axiosConfig = axiosReqConfig;
    const logId = 'middlewareListHolidays';
    console.time(logId);
    console.log('middleware calling list on MSHolidays...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(process.env.MS_HOLIDAYS, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSHolidays response...');
      return data;
    } catch (error) {
      console.error('Error to list on MSHolidays...');
      throw new Error(error);
    }
  }
}
