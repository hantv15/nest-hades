import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './modules/weather/weather.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { MailModule } from './modules/mail/mail.module';
import { JaapnModule } from './modules/japan/japan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    CommonModule,
    WeatherModule,
    TelegramModule,
    MailModule,
    JaapnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
