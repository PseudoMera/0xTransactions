import { RetrieveTransactionStatusResponse } from '../interfaces/retrieve-transaction-status.interface';

export const mockRetrieveTransactionStatusResponse: RetrieveTransactionStatusResponse =
  {
    blockNumber: 12345678,
    blockHash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890',
    chainId: '1',
    data: '0xabcdef',
    from: '0xSenderAddress1234567890abcdef1234567890abcdef1234',
    gasLimit: '21000',
    gasPrice: '1000000000',
    hash: '0xTransactionHash1234567890abcdef1234567890abcdef1234',
    maxFeePerGas: '1500000000',
    maxPriorityFeePerGas: '2000000000',
    nonce: 0,
    signature: {
      networkV: 1,
      r: '0xSignatureRValue1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      s: '0xSignatureSValue1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      v: 27,
    },
    to: '0xRecipientAddress1234567890abcdef1234567890abcdef1234',
    index: 0,
    type: 2,
    value: '1000000000000000000',
  };
