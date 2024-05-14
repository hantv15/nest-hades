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

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async handleCronEveryDayAt6Pm() {
    const { data } = await this.weatherService.getWeatherCity();

    const dataFormat = {
      name: data.name,
      clouds: data.clouds,
      wind: data.wind,
      main: data.main,
      weather: data.weather,
    };

    const message = `\nThời tiết: ${dataFormat.name}
    \nNgày ${dayjs(new Date()).daysInMonth()} tháng ${dayjs(new Date()).month() + 1} năm ${dayjs(new Date()).get('years')}
    \nNhiệt độ: ${dataFormat.main.temp}°C
    \nThời tiết: ${dataFormat.weather[0].description}
    \nNhiệt độ ngoài trời: ${dataFormat.main.feels_like}°C
    \nĐộ ẩm: ${dataFormat.main.humidity}%
    \nTốc độ gió: ${dataFormat.wind.speed} km/h`;

    await this.sendMessageToChannel(message);
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleCronEveryDayAt6Am() {
    const { data } = await this.weatherService.getWeatherCity();

    const dataFormat = {
      name: data.name,
      clouds: data.clouds,
      wind: data.wind,
      main: data.main,
      weather: data.weather,
    };

    const message = `\nThời tiết: ${dataFormat.name}
    \nNgày ${dayjs(new Date()).daysInMonth()} tháng ${dayjs(new Date()).month() + 1} năm ${dayjs(new Date()).get('years')}
    \nNhiệt độ: ${dataFormat.main.temp}°C
    \nThời tiết: ${dataFormat.weather[0].description}
    \nNhiệt độ ngoài trời: ${dataFormat.main.feels_like}°C
    \nĐộ ẩm: ${dataFormat.main.humidity}%
    \nTốc độ gió: ${dataFormat.wind.speed} km/h`;

    await this.sendMessageToChannel(message);
  }
}
