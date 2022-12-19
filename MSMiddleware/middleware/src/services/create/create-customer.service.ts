import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class CreateCustomerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = createCustomerDto;
    const logId = 'middlewarePostCustomer';
    console.log('middleware calling post on MSCustomers...');
    console.time(logId);
    try {
      const data = await lastValueFrom(
        this.httpService
          .post(process.env.MS_CUSTOMERS, createCustomerDto)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSCustomers response...');
      return data;
    } catch (error) {
      console.error('Error to post on MSCustomers...');
      throw new Error(error);
    }
  }

  async createWithList(createCustomerDto: CreateCustomerDto[]): Promise<any[]> {
    const axiosConfig = axiosReqConfig;
    const results = [];
    const logId = 'middlewarePostCustomer';
    console.time(logId);
    console.log('middleware calling post on MSCustomers...');
    try {
      createCustomerDto.forEach(async (item: CreateCustomerDto) => {
        axiosConfig.params = item;
        const data = await lastValueFrom(
          this.httpService
            .post(process.env.MS_CUSTOMERS, item)
            .pipe(map((response) => response.data)),
        );
        results.push(data);
      });
      console.timeEnd(logId);
      console.log('middleware got MSCustomers response...');
      return results;
    } catch (error) {
      console.error('Error to post on MSCustomers...');
      throw new Error(error);
    }
  }
}
