import { Test, TestingModule } from '@nestjs/testing';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';
import { EthersModule } from 'src/ethers/ethers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'nestjs-pino';

describe('SwapController', () => {
  let controller: SwapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule, LoggerModule.forRoot(), EthersModule],
      controllers: [SwapController],
      providers: [
        SwapService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'API_URL') {
                return 'https://example.com'; // Mock API_URL value for testing
              }
              return null;
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SwapController>(SwapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
