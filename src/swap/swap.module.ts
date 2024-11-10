import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapController } from './swap.controller';
import { HttpModule } from '@nestjs/axios';
import { EthersModule } from 'src/ethers/ethers.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        headers: {
          '0x-version': 'v2',
        },
      }),
    }),
    EthersModule,
  ],
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule {}
