import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from '../weather/weather.service';
import * as dayjs from 'dayjs';

@Injectable()
export class TelegramService {
  constructor(private readonly weatherService: WeatherService) {};

  async sendMessageToChannel(message: any, photo) {
    const urlSendChannelTele = `${process.env.TELEGRAM_ORG_KEY}/${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await axios.get(urlSendChannelTele,
      { params: { chat_id: process.env.TELEGRAM_CHAT_ID, text: message, parse_mode: "HTML", photo} });
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleCronEvery10Seconds() {
    const { data } = await this.weatherService.getWeatherCity();

    const dataFormat = {
      name: data.name,
      clouds: data.clouds,
      wind: data.wind,
      main: data.main,
      weather: data.weather
    }

    const urlImageWeather = `https://openweathermap.org/img/wn/${dataFormat.weather.icon}@2x.png`;

    const message = `\nThời tiết: ${dataFormat.name}
    \nNgày ${dayjs(new Date()).get('days')} tháng ${dayjs(new Date()).get('months')} năm ${dayjs(new Date()).get('years')}
    \nNhiệt độ: ${dataFormat.main.temp}°C
    \nThời tiết: ${dataFormat.weather.description}
    \nNhiệt độ ngoài trời: ${dataFormat.main.feels_like}°C
    \nĐộ ẩm: ${dataFormat.main.humidity}%
    \nTốc độ gió: ${dataFormat.wind.speed}km/h`;

    await this.sendMessageToChannel(message, urlImageWeather);
  }
}
