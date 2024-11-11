export interface RetrieveTransactionStatusResponse {
  blockNumber: number;
  blockHash: string;
  chainId: string;
  data: string;
  from: string;
  gasLimit: string;
  gasPrice: string;
  hash: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  nonce: number;
  signature: Signature;
  to: string | null;
  index: number;
  type: number;
  value: string;
}

interface Signature {
  networkV: number | null;
  r: string;
  s: string;
  v: number;
}
