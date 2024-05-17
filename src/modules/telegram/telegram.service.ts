// Nest dependencies
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

// Other dependencies
import axios from 'axios';
import * as dayjs from 'dayjs';

// Local dependencies
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class TelegramService {
  constructor(private readonly weatherService: WeatherService) {}

  private getTemplateMesaage(dataFormat: {
    name: string;
    clouds: { all: number };
    wind: { speed: number; deg: number; gust: number };
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    weather: { id: number; main: string; description: string; icon: string }[];
  }) {
    return `\nThời tiết: ${dataFormat.name}
    \nNgày ${dayjs(new Date()).day()} tháng ${dayjs(new Date()).month() + 1} năm ${dayjs(new Date()).get('years')}
    \nNhiệt độ: ${dataFormat.main.temp}°C
    \nThời tiết: ${dataFormat.weather[0].description}
    \nNhiệt độ ngoài trời: ${dataFormat.main.feels_like}°C
    \nĐộ ẩm: ${dataFormat.main.humidity}%
    \nTốc độ gió: ${dataFormat.wind.speed} km/h`;
  }

  async sendMessageToChannel(message: any) {
    const urlSendChannelTele = `${process.env.TELEGRAM_ORG_KEY}/${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    await axios.get(urlSendChannelTele, {
      params: {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      },
    });
  }

  async sendNotificationWeather() {
    const { data } = await this.weatherService.getWeatherCity();

    const dataFormat: {
      name: string;
      clouds: { all: number };
      wind: { speed: number; deg: number; gust: number };
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
    } = {
      name: data.name,
      clouds: data.clouds,
      wind: data.wind,
      main: data.main,
      weather: data.weather,
    };

    const message = this.getTemplateMesaage(dataFormat);

    await this.sendMessageToChannel(message);
  }

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  handleCronEveryDayAt6Pm() {    this.sendNotificationWeather();
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  handleCronEveryDayAt12PM() {
    this.sendNotificationWeather();
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleCronEveryDayAt6Am() {
    this.sendNotificationWeather();
  }
}
