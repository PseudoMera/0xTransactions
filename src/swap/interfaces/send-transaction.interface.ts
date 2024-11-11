export interface SendTransactionResponse {
  blockHash: string;
  blockNumber: number;
  cumulativeGasUsed: string;
  from: string;
  gasPrice: string;
  blobGasUsed: string | null;
  blobGasPrice: string | null;
  gasUsed: string;
  hash: string;
  status: number;
  to: string | null;
}
