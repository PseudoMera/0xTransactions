import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwapModule } from './swap/swap.module';

@Module({
  imports: [SwapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
