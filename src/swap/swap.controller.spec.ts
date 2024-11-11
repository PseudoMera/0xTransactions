import { Test, TestingModule } from '@nestjs/testing';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';
import { RetrieveQuoteDTO } from './dto/retrieve-quote.dto';
import { ExecuteSwapDTO } from './dto/execute-swap.dto';

describe('SwapController', () => {
  let controller: SwapController;
  let swapService: SwapService;

  const mockSwapService = {
    retrieveQuote: jest.fn(),
    sendTransaction: jest.fn(),
    retrieveTransactionStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapController],
      providers: [
        {
          provide: SwapService,
          useValue: mockSwapService,
        },
      ],
    }).compile();

    controller = module.get<SwapController>(SwapController);
    swapService = module.get<SwapService>(SwapService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('retrieveQuote', () => {
    it('should call swapService.retrieveQuote with correct DTO and return result', async () => {
      const dto: RetrieveQuoteDTO = {
        buyToken: 'ETH',
        sellToken: 'DAI',
        sellAmount: '1000000000000000000',
        taker: '0x1234567890abcdef',
        chainID: 1,
      };

      const expectedResult = { price: '2000' }; // Mocked response
      mockSwapService.retrieveQuote.mockResolvedValue(expectedResult);

      const result = await controller.retrieveQuote(dto);
      expect(swapService.retrieveQuote).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('executeSwap', () => {
    it('should call swapService.sendTransaction with correct DTO and return result', async () => {
      const dto: ExecuteSwapDTO = {
        buyToken: 'ETH',
        sellToken: 'DAI',
        sellAmount: '1000000000000000000',
        walletAddress: '0x1234567890abcdef',
        chainId: '1',
        privateKey: 'mockPrivateKey',
      };

      const expectedResult = { transactionHash: '0xtransactionhash' };
      mockSwapService.sendTransaction.mockResolvedValue(expectedResult);

      const result = await controller.executeSwap(dto);
      expect(swapService.sendTransaction).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('retrieveTransactionStatus', () => {
    it('should call swapService.retrieveTransactionStatus with correct txHash and return result', async () => {
      const txHash = '0xtransactionhash';
      const expectedResult = {
        blockNumber: 123456,
        blockHash: '0xblockhash',
        status: 1,
      };

      mockSwapService.retrieveTransactionStatus.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.retrieveTransactionStatus(txHash);
      expect(swapService.retrieveTransactionStatus).toHaveBeenCalledWith(
        txHash,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
