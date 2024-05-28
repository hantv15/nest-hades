import 'dotenv/config';

// Nest dependencies
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

// Other dependencies
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { ValidationError } from 'class-validator';

// Local dependencies
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.PREFIX_APPLICATION);

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return errors[0];
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Generate port
  Logger.log(`Listening: ${process.env.PORT}`);
}
bootstrap();
