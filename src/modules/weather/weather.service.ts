import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  async getWeatherCity() {
    return await axios({
      method: 'GET',
      url: process.env.API_OPEN_WEATHER_MAP_URL,
      params: {
        q: "Hà Nội",
        units: "metric",
        appid: process.env.API_OPEN_WEATHER_MAP_KEY,
        lang: 'vi'
      },
    });
  }
}
