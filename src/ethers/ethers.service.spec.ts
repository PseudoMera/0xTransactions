import { Test, TestingModule } from '@nestjs/testing';
import { EthersService } from './ethers.service';
import { ConfigModule } from '@nestjs/config';

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EthersService],
    }).compile();

    service = module.get<EthersService>(EthersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
