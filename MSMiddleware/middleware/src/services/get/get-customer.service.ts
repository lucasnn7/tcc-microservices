import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class GetCustomerService {
  constructor(private readonly httpService: HttpService) {}

  async get(id: string): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareGetCustomer';
    console.time(logId);
    console.log('middleware calling get on MSCustomers...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(process.env.MS_CUSTOMERS + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );

      console.timeEnd(logId);
      console.log('middleware got MSCustomers response...');
      return data;
    } catch (error) {
      console.error('Error to get on MSCustomers...');
      throw new Error(error);
    }
  }
}
