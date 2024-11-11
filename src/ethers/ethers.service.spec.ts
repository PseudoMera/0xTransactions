import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EthersService } from './ethers.service';
import { ethers, JsonRpcProvider, TransactionResponse, Wallet } from 'ethers';
import { SendTransactionDTO } from './dto/send-transaction.dto';

describe('EthersService', () => {
  let service: EthersService;
  let configService: ConfigService;
  let provider: JsonRpcProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EthersService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:8545'),
          },
        },
      ],
    }).compile();

    service = module.get<EthersService>(EthersService);
    configService = module.get<ConfigService>(ConfigService);

    await service.onModuleInit();
    provider = service['provider'];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onModuleInit', () => {
    it('should initialize provider with RPC_URL from config', async () => {
      const rpcUrl = 'http://localhost:8545';
      jest.spyOn(configService, 'get').mockReturnValue(rpcUrl);

      await service.onModuleInit();

      expect(configService.get).toHaveBeenCalledWith('RPC_URL');
      expect(service['provider']).toBeInstanceOf(JsonRpcProvider);
    });
  });

  describe('broadcastTransaction', () => {
    it('should broadcast a transaction and return receipt', async () => {
      const signedTx = '0xSignedTransaction';
      const mockReceipt = { transactionHash: '0x123' };

      jest.spyOn(provider, 'broadcastTransaction').mockResolvedValue({
        wait: jest.fn().mockResolvedValue(mockReceipt),
      } as any);

      const receipt = await service.broadcastTransaction(signedTx);

      expect(provider.broadcastTransaction).toHaveBeenCalledWith(signedTx);
      expect(receipt).toEqual(mockReceipt);
    });

    it('should throw an error if broadcasting fails', async () => {
      const signedTx = '0xSignedTransaction';
      jest
        .spyOn(provider, 'broadcastTransaction')
        .mockRejectedValue(new Error('Broadcast failed'));

      await expect(service.broadcastTransaction(signedTx)).rejects.toThrow(
        'Failed to broadcast transaction: Broadcast failed',
      );
    });
  });

  describe('sendTransaction', () => {
    it('should send a transaction and return the receipt', async () => {
      const pk =
        '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63';
      const sendTxDTO: SendTransactionDTO = {
        to: '0xFCAd0B19bB29D4674531d6f115237E16AfCE377c',
        from: '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73',
        value: '1000',
        chainId: 1,
        gasLimit: '21000',
        gasPrice: '1000000000',
        nonce: 0,
      };

      const mockReceipt = { transactionHash: '0x123' };

      jest.spyOn(provider, 'getTransactionCount').mockResolvedValue(0);

      jest.spyOn(Wallet.prototype, 'sendTransaction').mockResolvedValue({
        wait: jest.fn().mockResolvedValue(mockReceipt),
      } as any);

      const receipt = await service.sendTransaction(pk, sendTxDTO);

      expect(provider.getTransactionCount).toHaveBeenCalledWith(
        new Wallet(pk).address,
      );
      expect(receipt).toEqual(mockReceipt);
    });

    it('should throw an error if sending fails', async () => {
      const pk = '0xPrivateKey';
      const sendTxDTO: SendTransactionDTO = {
        to: '0xReceiver',
        from: '0xSender',
        value: '1000',
        chainId: 1,
        gasLimit: '21000',
        gasPrice: '1000000000',
        nonce: 1,
      };

      jest.spyOn(provider, 'getTransactionCount').mockResolvedValue(0);

      jest
        .spyOn(Wallet.prototype, 'sendTransaction')
        .mockRejectedValue(new Error('Send failed'));

      await expect(service.sendTransaction(pk, sendTxDTO)).rejects.toThrow(
        'Failed to send transaction: ',
      );
    });
  });

  describe('getTransaction', () => {
    it('should retrieve a transaction by hash', async () => {
      const txHash = '0xTransactionHash';
      const mockTx: TransactionResponse = {
        hash: txHash,
        from: '0xSender',
        to: '0xReceiver',
        nonce: 0,
        gasLimit: ethers.toBigInt(21000),
        gasPrice: ethers.toBigInt(1000000000),
        data: '0x',
        value: ethers.toBigInt(1000),
        chainId: ethers.toBigInt(1),
        confirmations: 0,
        blockNumber: null,
        blockHash: null,
        timestamp: null,
        transactionIndex: null,
        r: '0x',
        s: '0x',
        v: 1,
        type: 2,
        accessList: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
        blobVersionedHashes: [],
        index: 0,
        maxFeePerBlobGas: ethers.toBigInt(0),
        provider: {} as any,

        wait: jest.fn().mockResolvedValue({}),
        toJSON: jest.fn(),
        isMined: jest.fn(),
        isLegacy: jest.fn(),
        isBerlin: jest.fn(),
        isLondon: jest.fn(),
        isCancun: jest.fn(),
        getBlock: jest.fn(),
        getTransaction: jest.fn().mockResolvedValue(null),
        removedEvent: jest.fn(),
        reorderedEvent: jest.fn(),
        replaceableTransaction: jest.fn(),

        ['#private']: {} as any,
      } as unknown as TransactionResponse;

      jest.spyOn(provider, 'getTransaction').mockResolvedValue(mockTx);

      const transaction = await service.getTransaction(txHash);

      expect(provider.getTransaction).toHaveBeenCalledWith(txHash);
      expect(transaction).toEqual(mockTx);
    });

    it('should throw an error if retrieving transaction fails', async () => {
      const txHash = '0xTransactionHash';
      jest
        .spyOn(provider, 'getTransaction')
        .mockRejectedValue(new Error('Transaction not found'));

      await expect(service.getTransaction(txHash)).rejects.toThrow(
        'Failed to get transaction: Transaction not found',
      );
    });
  });
});
