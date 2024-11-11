import {
  ethers,
  JsonRpcProvider,
  TransactionReceipt,
  TransactionResponse,
} from 'ethers';

export const mockEtherTxResponse: TransactionResponse = {
  hash: '0xTransactionHash',
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

export const mockTransactionReceiptParams = {
  to: '0xRecipientAddress',
  from: '0xSenderAddress',
  contractAddress: null,
  hash: '0xTransactionHash',
  index: 0,
  blockHash: '0xBlockHash',
  blockNumber: 123456,
  logsBloom: '0x' + '0'.repeat(512), // mock 512-bit bloom filter
  gasUsed: BigInt(21000),
  blobGasUsed: null,
  cumulativeGasUsed: BigInt(21000),
  gasPrice: BigInt(1000000000), // 1 Gwei
  blobGasPrice: null,
  type: 2,
  status: 1,
  root: null,
  logs: [],
};

const mockProvider = new JsonRpcProvider();
export const mockTransactionReceipt = new TransactionReceipt(
  mockTransactionReceiptParams,
  mockProvider,
);
