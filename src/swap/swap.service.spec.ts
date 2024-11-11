import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { BadRequestException } from '@nestjs/common';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { SwapService } from './swap.service';
import { EthersService } from 'src/ethers/ethers.service';
import { RetrieveQuoteDTO } from './dto/retrieve-quote.dto';
import { ExecuteSwapDTO } from './dto/execute-swap.dto';
import { mockRetrieveQuoteResponse } from './dummy/retrieve-quote.dummy';
import { AxiosHeaders } from 'axios';
import { mockTransactionReceipt } from 'src/ethers/dummy/ether-send-transanction.dummy';
import { mockTransactionResponse } from 'src/ethers/dummy/ether-get-transaction.dummy';

describe('SwapService', () => {
  let swapService: SwapService;
  let configService: ConfigService;
  let httpService: HttpService;
  let ethersService: EthersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), LoggerModule.forRoot()],
      providers: [
        SwapService,
        ConfigService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: EthersService,
          useValue: {
            sendTransaction: jest.fn(),
            getTransaction: jest.fn(),
          },
        },
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    swapService = module.get<SwapService>(SwapService);
    configService = module.get<ConfigService>(ConfigService);
    httpService = module.get<HttpService>(HttpService);
    ethersService = module.get<EthersService>(EthersService);

    jest.spyOn(configService, 'get').mockReturnValue('mock-api-url');
  });

  describe('retrieveQuote', () => {
    it('should return quote data successfully', async () => {
      const mockQuoteResponse = {
        data: mockRetrieveQuoteResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockQuoteResponse));

      const retrieveQuoteDTO: RetrieveQuoteDTO = {
        buyToken: 'ETH',
        sellAmount: '1000',
        sellToken: 'DAI',
        taker: '0x123',
        chainID: 1,
      };

      const result = await swapService.retrieveQuote(retrieveQuoteDTO);
      expect(result).toEqual(mockQuoteResponse.data);
    });

    it('should throw BadRequestException on error', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => new Error('Request failed')));

      const retrieveQuoteDTO: RetrieveQuoteDTO = {
        buyToken: 'ETH',
        sellAmount: '1000',
        sellToken: 'DAI',
        taker: '0x123',
        chainID: 0,
      };

      await expect(swapService.retrieveQuote(retrieveQuoteDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('sendTransaction', () => {
    it('should return SendTransactionResponse on successful transaction', async () => {
      jest
        .spyOn(swapService, 'retrieveQuote')
        .mockResolvedValue(mockRetrieveQuoteResponse);
      jest
        .spyOn(ethersService, 'sendTransaction')
        .mockResolvedValue(mockTransactionReceipt);

      const executeSwapDTO: ExecuteSwapDTO = {
        buyToken: 'ETH',
        sellAmount: '1000',
        sellToken: 'DAI',
        walletAddress: '0x123',
        chainId: '1',
        privateKey: 'mockPrivateKey',
      };

      const result = await swapService.sendTransaction(executeSwapDTO);
      expect(result).toEqual({
        blockHash: mockTransactionReceipt.blockHash,
        blockNumber: mockTransactionReceipt.blockNumber,
        cumulativeGasUsed: mockTransactionReceipt.cumulativeGasUsed.toString(),
        from: mockTransactionReceipt.from,
        gasPrice: mockTransactionReceipt.gasPrice.toString(),
        blobGasUsed: '',
        blobGasPrice: '',
        gasUsed: mockTransactionReceipt.gasUsed.toString(),
        hash: mockTransactionReceipt.hash,
        status: mockTransactionReceipt.status,
        to: mockTransactionReceipt.to,
      });
    });

    it('should throw BadRequestException when transaction fails', async () => {
      jest
        .spyOn(swapService, 'retrieveQuote')
        .mockResolvedValue(mockRetrieveQuoteResponse);
      jest.spyOn(ethersService, 'sendTransaction').mockResolvedValue(null);

      const executeSwapDTO: ExecuteSwapDTO = {
        buyToken: 'ETH',
        sellAmount: '1000',
        sellToken: 'DAI',
        walletAddress: '0x123',
        chainId: '1',
        privateKey: 'mockPrivateKey',
      };

      await expect(swapService.sendTransaction(executeSwapDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('retrieveTransactionStatus', () => {
    it('should return RetrieveTransactionStatusResponse when transaction is found', async () => {
      jest
        .spyOn(ethersService, 'getTransaction')
        .mockResolvedValue(mockTransactionResponse);

      const result = await swapService.retrieveTransactionStatus('0xhash');
      expect(result).toEqual({
        blockNumber: mockTransactionResponse.blockNumber,
        blockHash: mockTransactionResponse.blockHash,
        chainId: mockTransactionResponse.chainId.toString(),
        data: mockTransactionResponse.data,
        from: mockTransactionResponse.from,
        gasLimit: mockTransactionResponse.gasLimit.toString(),
        gasPrice: mockTransactionResponse.gasPrice.toString(),
        hash: mockTransactionResponse.hash,
        maxFeePerGas: mockTransactionResponse.maxFeePerGas?.toString(),
        maxPriorityFeePerGas:
          mockTransactionResponse.maxPriorityFeePerGas?.toString(),
        nonce: mockTransactionResponse.nonce,
        signature: {
          networkV: Number(mockTransactionResponse.signature.networkV),
          r: mockTransactionResponse.signature.r,
          s: mockTransactionResponse.signature.s,
          v: mockTransactionResponse.signature.v,
        },
        to: mockTransactionResponse.to,
        index: mockTransactionResponse.index,
        type: mockTransactionResponse.type,
        value: mockTransactionResponse.value.toString(),
      });
    });

    it('should throw BadRequestException when transaction is not found', async () => {
      jest.spyOn(ethersService, 'getTransaction').mockResolvedValue(null);

      await expect(
        swapService.retrieveTransactionStatus('0xhash'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
