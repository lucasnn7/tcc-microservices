import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { UpdateHolidayDto } from 'src/dto/update-holiday.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class UpdateHolidayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async update(id: Date, updateHolidayDto: UpdateHolidayDto) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    axiosConfig.data = updateHolidayDto;
    const logId = 'middlewareUpdateHoliday';
    console.time(logId);
    console.log('middleware calling update on MSHolidays...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .patch(
            process.env.MS_HOLIDAYS + `/:id`,
            updateHolidayDto,
            axiosConfig,
          )
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSHolidays response...');
      return data;
    } catch (error) {
      console.error('Error to update on MSHolidays...');
      throw new Error(error);
    }
  }
}
