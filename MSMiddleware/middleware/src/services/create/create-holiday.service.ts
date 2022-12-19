import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { CreateHolidayDto } from 'src/dto/create-holiday.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class CreateHolidayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async create(createHolidayDto: CreateHolidayDto): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = createHolidayDto;
    const logId = 'middlewarePostHoliday';
    console.log('middleware calling post on MSHolidays...');
    console.time(logId);
    try {
      const data = await lastValueFrom(
        this.httpService
          .post(process.env.MS_HOLIDAYS, createHolidayDto, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSHolidays response...');
      return data;
    } catch (error) {
      console.error('Error to post on MSHolidays...');
      throw new Error(error);
    }
  }

  async createWithList(createHolidayDto: CreateHolidayDto[]): Promise<any[]> {
    const axiosConfig = axiosReqConfig;
    const results = [];
    const logId = 'middlewarePostHoliday';
    console.time(logId);
    console.log('middleware calling post on MSHolidays...');
    try {
      createHolidayDto.forEach(async (item: CreateHolidayDto) => {
        axiosConfig.params = item;
        const data = await lastValueFrom(
          this.httpService
            .post(process.env.MS_HOLIDAYS, item, axiosConfig)
            .pipe(map((response) => response.data)),
        );
        results.push(data);
      });
      console.timeEnd(logId);
      console.log('middleware got MSHolidays response...');
      return results;
    } catch (error) {
      console.error('Error to post on MSHolidays...');
      throw new Error(error);
    }
  }
}
