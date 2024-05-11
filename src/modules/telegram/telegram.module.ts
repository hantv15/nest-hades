import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [ScheduleModule.forRoot(), WeatherModule],
  providers: [TelegramService],
})
export class TelegramModule {}
