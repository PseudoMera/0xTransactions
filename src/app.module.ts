import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwapModule } from './swap/swap.module';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './shared/config/config';
import { validationSchema } from './shared/config/validation.config.schema';
import { ApiKeyMiddleware } from './middlewares/api-key/api-key.middleware';
import { LoggerModule } from 'nestjs-pino';
import { EthersService } from './ethers/ethers.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfiguration],
      validationSchema,
    }),
    LoggerModule.forRoot(),
    SwapModule,
  ],
  controllers: [AppController],
  providers: [AppService, EthersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('swap');
  }
}
