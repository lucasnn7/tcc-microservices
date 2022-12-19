import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class DeleteProjectService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async delete(id: string) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareDeleteProject';
    console.time(logId);
    console.log('middleware calling delete on MSProjects...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .delete(process.env.MS_PROJECTS + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSProjects response...');
      return data;
    } catch (error) {
      console.error('Error to delete on MSProjects...');
      throw new Error(error);
    }
  }
}
