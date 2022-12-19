import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';
@Injectable()
export class GetHolidayService {
  constructor(private readonly httpService: HttpService) {}

  async get(id: Date): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareGetHoliday';
    console.time(logId);
    console.log('middleware calling get on MSHolidays...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(process.env.MS_HOLIDAYS + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSHolidays response...');
      return data;
    } catch (error) {
      console.error('Error to get on MSHolidays...');
      throw new Error(error);
    }
  }
}
