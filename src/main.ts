import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const apiURL = configService.get<string>('api.API_URL');
  const apiKey = configService.get<string>('API_KEY');

  console.log(port);
  console.log(apiURL);
  console.log(apiKey);

  await app.listen(port);
}
bootstrap();
