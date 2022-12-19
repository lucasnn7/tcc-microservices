import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UpdateCustomerDto } from 'src/dto/update-customer.dto';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class UpdateCustomerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    axiosConfig.data = updateCustomerDto;
    const logId = 'middlewareUpdateCustomer';
    console.time(logId);
    console.log('middleware calling update on MSCustomers...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .patch(
            process.env.MS_CUSTOMERS + `/:id`,
            updateCustomerDto,
            axiosConfig,
          )
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSCustomers response...');
      return data;
    } catch (error) {
      console.error('Error to update on MSCustomers...');
      throw new Error(error);
    }
  }

  async updateWithKafka(id: string, updateCustomerDto: UpdateCustomerDto) {
    const logId = 'middlewareUpdateCustomer';
    console.log('middleware producing update message to MSCustomers...');
    const message = { id: id, dto: updateCustomerDto };
    console.time(logId);
    try {
      await this.producerService.produce({
        topic: 'UpdateCustomerTopic',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.timeEnd(logId);
      console.log(
        'middleware managed to produce update message to MSCustomers...',
      );
      return { message };
    } catch (error) {
      console.error('Error to produce update message to MSCustomers...');
      throw new Error(error);
    }
  }
}
