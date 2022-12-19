import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class UpdateProjectService {
  constructor(
    private readonly httpService: HttpService,
    private readonly producerService: ProducerService,
  ) {}

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    axiosConfig.data = updateProjectDto;
    const logId = 'middlewareUpdateProject';
    console.time(logId);
    console.log('middleware calling update on MSProjects...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .patch(
            process.env.MS_PROJECTS + `/:id`,
            updateProjectDto,
            axiosConfig,
          )
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log(data, '<<<<<');
      console.log('middleware got MSProjects response...');
      return data;
    } catch (error) {
      console.error('Error to update on MSProjects...');
      throw new Error(error);
    }
  }

  async updateWithKafka(id: number, updateProjectDto: UpdateProjectDto) {
    const logId = 'middlewareUpdateProject';
    console.log('middleware producing update message to MSProjects...');
    const message = { id: id, dto: updateProjectDto };
    console.time(logId);
    try {
      await this.producerService.produce({
        topic: 'UpdateProjectTopic',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.timeEnd(logId);
      console.log(
        'middleware managed to produce update message to MSProjects...',
      );
      return { message };
    } catch (error) {
      console.error('Error to produce update message to MSProjects...');
      throw new Error(error);
    }
  }
}
