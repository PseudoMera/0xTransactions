import { Module } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EthersService],
  exports: [EthersService],
})
export class EthersModule {}
