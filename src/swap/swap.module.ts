import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapController } from './swap.controller';
import { HttpModule } from '@nestjs/axios';
import { EthersService } from 'src/ethers/ethers.service';

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
  ],
  controllers: [SwapController],
  providers: [SwapService, EthersService],
})
export class SwapModule {}
