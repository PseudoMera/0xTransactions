import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  const port = configService.get<number>('PORT') || 3000;
  const apiURL = configService.get<string>('API_URL');
  const apiKey = configService.get<string>('API_KEY');

  console.log(port);
  console.log(apiURL);
  console.log(apiKey);

  await app.listen(port);
}
bootstrap();
