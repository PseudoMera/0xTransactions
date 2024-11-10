export interface RetrieveQuoteResponse {
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: Fees;
  issues: Issues;
  liquidityAvailable: boolean;
  minBuyAmount: string;
  permit2: Permit2;
  route: Route;
  sellAmount: string;
  sellToken: string;
  tokenMetadata: TokenMetadata;
  totalNetworkFee: string;
  transaction: Transaction;
  zid: string;
}

interface Fees {
  integratorFee: string | null;
  zeroExFee: string | null;
  gasFee: string | null;
}

interface Issues {
  allowance: Allowance;
  balance: Balance;
  simulationIncomplete: boolean;
  invalidSourcesPassed: string[];
}

interface Allowance {
  actual: string;
  spender: string;
}

interface Balance {
  token: string;
  actual: string;
  expected: string;
}

interface Permit2 {
  type: string;
  hash: string;
  eip712: EIP712;
}

interface EIP712 {
  types: Types;
  domain: EIP712Domain;
  message: PermitMessage;
  primaryType: string;
}

interface Types {
  PermitTransferFrom: Field[];
  TokenPermissions: Field[];
  EIP712Domain: Field[];
}

interface Field {
  name: string;
  type: string;
}

interface EIP712Domain {
  name: string;
  chainId: number;
  verifyingContract: string;
}

interface PermitMessage {
  permitted: TokenPermissions;
  spender: string;
  nonce: string;
  deadline: string;
}

interface TokenPermissions {
  token: string;
  amount: string;
}

interface Route {
  fills: Fill[];
  tokens: Token[];
}

interface Fill {
  from: string;
  to: string;
  source: string;
  proportionBps: string;
}

interface Token {
  address: string;
  symbol: string;
}

interface TokenMetadata {
  buyToken: Tax;
  sellToken: Tax;
}

interface Tax {
  buyTaxBps: string;
  sellTaxBps: string;
}

interface Transaction {
  to: string;
  data: string;
  gas: string;
  gasPrice: string;
  value: string;
}
