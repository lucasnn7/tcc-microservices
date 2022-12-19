import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { axiosReqConfig } from 'src/utils/axiosRequestConfig';

@Injectable()
export class GetProjectService {
  constructor(private readonly httpService: HttpService) {}

  async get(id: number): Promise<any> {
    const axiosConfig = axiosReqConfig;
    axiosConfig.params = id;
    const logId = 'middlewareGetProject';
    console.time(logId);
    console.log('middleware calling get on MSProjects...');
    try {
      const data = await lastValueFrom(
        this.httpService
          .get(process.env.MS_PROJECTS + `/:id`, axiosConfig)
          .pipe(map((response) => response.data)),
      );
      console.timeEnd(logId);
      console.log('middleware got MSProjects response...');
      return data;
    } catch (error) {
      console.error('Error to get on MSProjects...');
      throw new Error(error);
    }
  }
}
