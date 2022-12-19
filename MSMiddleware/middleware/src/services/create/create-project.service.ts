import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { CreateProjectDto } from 'src/dto/create-project.dto';
// import { ProducerService } from 'src/kafka/producer.service';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class CreateProjectService {
  constructor(
    private readonly httpService: HttpService, // private readonly producerService: ProducerService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = createProjectDto;

    const logId = 'middlewarePostProject';
    console.log('middleware calling post on MSProjects...');
    console.time(logId);
    try {
      const data = await lastValueFrom(
        this.httpService
          .post(process.env.MS_PROJECTS, createProjectDto, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSProjects response...');
      return data;
    } catch (error) {
      console.error('Error to post on MSProjects...');
      throw new Error(error);
    }
  }

  async createWithList(createProjectDto: CreateProjectDto[]): Promise<any[]> {
    const axiosConfig = axiosReqConfig;
    const results = [];
    const logId = 'middlewarePostProject';
    console.time(logId);
    console.log('middleware calling post on MSProjects...');
    try {
      createProjectDto.forEach(async (item: CreateProjectDto) => {
        // const objReq: CreateProjectDto = Object(item);
        axiosConfig.params = item;
        const data = await lastValueFrom(
          this.httpService
            .post(process.env.MS_PROJECTS, item, axiosConfig)
            .pipe(map((response) => response.data)),
        );
        results.push(data);
      });
      console.timeEnd(logId);
      console.log('middleware got MSProjects response...');
      return results;
    } catch (error) {
      console.error('Error to post on MSProjects...');
      throw new Error(error);
    }
  }
}
