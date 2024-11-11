import { SendTransactionResponse } from '../interfaces/send-transaction.interface';

export const mockSendTransactionResponse: SendTransactionResponse = {
  blockHash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890',
  blockNumber: 12345678,
  cumulativeGasUsed: '21000',
  from: '0xFromAddress1234567890abcdef1234567890abcdef1234',
  gasPrice: '1000000000', // 1 Gwei in wei
  blobGasUsed: null,
  blobGasPrice: null,
  gasUsed: '21000',
  hash: '0xTransactionHash1234567890abcdef1234567890abcdef1234',
  status: 1,
  to: '0xToAddress1234567890abcdef1234567890abcdef1234',
};
