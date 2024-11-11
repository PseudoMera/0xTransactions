import {
  AccessList,
  ethers,
  JsonRpcProvider,
  Signature,
  TransactionResponse,
} from 'ethers';

const mockProvider = new JsonRpcProvider();

const mockSignature = {
  networkV: ethers.toBigInt(1),
  r: '0xSignatureRValue1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  s: '0xSignatureSValue1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  v: 27,
  legacyChainId: null,
  yParity: 0,
  yParityAndS: '',
  compactSerialized: '',
  serialized: '',
  clone: function (): Signature {
    return this;
  },
  toJSON: function () {
    return {
      networkV: this.networkV,
      r: this.r,
      s: this.s,
      v: this.v,
      legacyChainId: this.legacyChainId,
      yParity: this.yParity,
      yParityAndS: this.yParityAndS,
      compactSerialized: this.compactSerialized,
      serialized: this.serialized,
    };
  },
} as Signature;

const mockAccessList: AccessList = [
  {
    address: '0xAccessListAddress',
    storageKeys: ['0xStorageKey1', '0xStorageKey2'],
  },
];

export const mockTransactionResponse = new TransactionResponse(
  {
    blockNumber: 12345678,
    blockHash: '0xBlockHash1234567890abcdef1234567890abcdef1234',
    index: 0,
    hash: '0xTransactionHash1234567890abcdef1234567890abcdef1234',
    type: 2,
    to: '0xRecipientAddress1234567890abcdef1234567890abcdef1234',
    from: '0xSenderAddress1234567890abcdef1234567890abcdef1234',
    nonce: 0,
    gasLimit: BigInt(21000),
    gasPrice: BigInt(1000000000), // 1 Gwei
    maxPriorityFeePerGas: BigInt(2000000000), // 2 Gwei
    maxFeePerGas: BigInt(1500000000), // 1.5 Gwei
    maxFeePerBlobGas: null,
    data: '0xTransactionData',
    value: BigInt(1000000000000000000), // 1 ETH in wei
    chainId: BigInt(1), // Ethereum mainnet chain ID
    signature: mockSignature,
    accessList: mockAccessList,
    blobVersionedHashes: ['0xBlobHash1234567890abcdef1234567890abcdef1234'],
  },
  mockProvider,
);
