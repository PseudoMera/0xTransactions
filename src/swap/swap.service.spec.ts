import { Test, TestingModule } from '@nestjs/testing';
import { SwapService } from './swap.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'nestjs-pino';
import { EthersModule } from 'src/ethers/ethers.module';

describe('SwapService', () => {
  let service: SwapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule, LoggerModule.forRoot(), EthersModule],
      providers: [
        SwapService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'API_URL') {
                return 'https://example.com';
              }
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<SwapService>(SwapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
