import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { UpdateDepartmentDto } from 'src/dto/update-department.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class UpdateDepartmentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    axiosConfig.data = updateDepartmentDto;
    const logId = 'middlewareUpdateDepartment';
    console.time(logId);
    console.log('middleware calling update on MSDepartments...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .patch(
            process.env.MS_DEPARTMENTS + `/:id`,
            updateDepartmentDto,
            axiosConfig,
          )
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSDepartments response...');
      return data;
    } catch (error) {
      console.error('Error to update on MSDepartments...');
      throw new Error(error);
    }
  }

  async updateWithKafka(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const logId = 'middlewareUpdateDepartment';
    console.log('middleware producing update message to MSDepartments...');
    const message = { id: id, dto: updateDepartmentDto };
    console.time(logId);
    try {
      await this.producerService.produce({
        topic: 'UpdateDepartmentTopic',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.timeEnd(logId);
      console.log(
        'middleware managed to produce update message to MSDepartments...',
      );
      return { message };
    } catch (error) {
      console.error('Error to produce update message to MSDepartments...');
      throw new Error(error);
    }
  }
}
