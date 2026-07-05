import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TimetableService {
  private readonly api: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.api = axios.create({
      baseURL: this.configService.getOrThrow<string>('timetable.api_url'),
      timeout: 0,
    });
  }

  async generate(course_ids: string[]) {
    await this.api.post<Record<string, unknown>>(
      '/timetable-generation/generate',
      {
        course_ids,
      },
    );

    return true;
  }
}
