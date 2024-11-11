import { RetrieveQuoteResponse } from '../interfaces/retrieve-quote.interface';

export const mockRetrieveQuoteResponse: RetrieveQuoteResponse = {
  blockNumber: '123456',
  buyAmount: '1000000000000000000', // 1 ETH in wei
  buyToken: 'ETH',
  fees: {
    integratorFee: '5000000000000000', // 0.005 ETH in wei
    zeroExFee: '2000000000000000', // 0.002 ETH in wei
    gasFee: '10000000000000000', // 0.01 ETH in wei
  },
  issues: {
    allowance: {
      actual: '5000000000000000000', // 5 ETH in wei
      spender: '0xSpenderAddress',
    },
    balance: {
      token: 'DAI',
      actual: '100000000000000000000', // 100 DAI in wei
      expected: '200000000000000000000', // 200 DAI in wei
    },
    simulationIncomplete: false,
    invalidSourcesPassed: [],
  },
  liquidityAvailable: true,
  minBuyAmount: '950000000000000000', // 0.95 ETH in wei
  permit2: {
    type: 'PermitTransfer',
    hash: '0xPermitHash',
    eip712: {
      types: {
        PermitTransferFrom: [
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        TokenPermissions: [
          { name: 'spender', type: 'address' },
          { name: 'nonce', type: 'uint256' },
        ],
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
      },
      domain: {
        name: 'ExampleDomain',
        chainId: 1,
        verifyingContract: '0xVerifyingContract',
      },
      message: {
        permitted: {
          token: '0xTokenAddress',
          amount: '1000000000000000000', // 1 Token in wei
        },
        spender: '0xSpenderAddress',
        nonce: '1',
        deadline: '1234567890',
      },
      primaryType: 'PermitTransferFrom',
    },
  },
  route: {
    fills: [
      {
        from: '0xSourceAddress',
        to: '0xTargetAddress',
        source: 'Uniswap',
        proportionBps: '5000', // 50%
      },
    ],
    tokens: [
      {
        address: '0xTokenAddress',
        symbol: 'DAI',
      },
      {
        address: '0xTokenAddress',
        symbol: 'ETH',
      },
    ],
  },
  sellAmount: '2000000000000000000', // 2 DAI in wei
  sellToken: 'DAI',
  tokenMetadata: {
    buyToken: {
      buyTaxBps: '20',
      sellTaxBps: '15',
    },
    sellToken: {
      buyTaxBps: '10',
      sellTaxBps: '5',
    },
  },
  totalNetworkFee: '5000000000000000', // 0.005 ETH in wei
  transaction: {
    to: '0xTransactionToAddress',
    data: '0xTransactionData',
    gas: '21000',
    gasPrice: '1000000000', // 1 Gwei
    value: '1000000000000000000', // 1 ETH in wei
  },
  zid: 'transaction_zid_123456',
};
