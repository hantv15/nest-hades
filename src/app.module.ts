import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { WeatherModule } from './modules/weather/weather.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { MailModule } from './modules/mail/mail.module';
import { JapanModule } from './modules/japan/japan.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { CatModule } from './modules/cat/cat.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    MongodbModule,
    CommonModule,
    WeatherModule,
    TelegramModule,
    MailModule,
    JapanModule,
    CatModule,
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
