# 0xTransactions

## Description

NestJS API that wraps 0x swap API.

## Setup instructions

```bash
$ nvm use

$ npm i
```

## Compile and run the project

### Using pkg manager

```bash
$ npm run start:dev
```

### Using Docker compose

```bash
$ docker compose up --build
```

### Building Dockerfile

```bash
$ docker build -t {image-name} .

$ docker run -p 3000:3000 {image-name}
```

## Env

```
// Application port (3000)
PORT=3000
// 0x API key
API_KEY=
// 0x Swap API
API_URL=https://api.0x.org/swap/permit2
// RPC URL (infura)
RPC_URL=https://sepolia.infura.io/v3/{your-rpc-id}

```

## API docs

### Quote

```json
{
  "endpoint": "/swap",
  "method": "GET",
  "Query params": {
    "chainID": "number",
    "buyToken": "string: token address",
    "sellToken": "string: token address",
    "taker": "string: your address"
  },
  "response": {
    "blockNumber": "string",
    "buyAmount": "string",
    "fees": {
      "integratorFee": "string",
      "zeroExFee": "string",
      "gasFee": "string"
    },
    "liquidityAvailable": "boolean",
    "minBuyAmount": "string",
    "sellAmount": "string",
    "sellToken": "string",
    "totalNetworkFee": "string",
    "transaction": {
      "to": "string",
      "data": "string",
      "gas": "string",
      "gasPrice": "string",
      "value": "string"
    },
    "zid"
  }
}
```

#### Example request

```localhost:3000/swap?chainID=1&sellAmount=90686870927255889510&sellToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&buyToken=0x6b175474e89094c44da98b954eedeac495271d0f&taker=0xab5801a7d398351b8be11c439e05c5b3259aec9b```

#### Example response

```json
{
    "approval": null,
    "blockNumber": "21159381",
    "buyAmount": "291509924219638587743970",
    "buyToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "fees": {
        "integratorFee": null,
        "zeroExFee": {
            "amount": "438097121283865520898",
            "token": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "type": "volume"
        },
        "gasFee": {
            "amount": "121820946015266324480",
            "token": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "type": "gas"
        }
    },
    "issues": {
        "allowance": {
            "actual": "0",
            "spender": "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        "balance": null,
        "simulationIncomplete": false,
        "invalidSourcesPassed": []
    },
    "liquidityAvailable": true,
    "minBuyAmount": "290635219506036951653520",
    "route": {
        "fills": [
            {
                "from": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "source": "Uniswap_V3",
                "proportionBps": "4500"
            },
            {
                "from": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "source": "0x_RFQ",
                "proportionBps": "5500"
            },
            {
                "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
                "source": "Maker_PSM",
                "proportionBps": "4500"
            },
            {
                "from": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
                "source": "Curve",
                "proportionBps": "5500"
            }
        ],
        "tokens": [
            {
                "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "symbol": "WETH"
            },
            {
                "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "symbol": "USDC"
            },
            {
                "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "symbol": "USDT"
            },
            {
                "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
                "symbol": "DAI"
            }
        ]
    },
    "sellAmount": "90686870927255889510",
    "sellToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "target": "0x12d737470fb3ec6c3deec9b518100bec9d520144",
    "tokenMetadata": {
        "buyToken": {
            "buyTaxBps": "0",
            "sellTaxBps": "0"
        },
        "sellToken": {
            "buyTaxBps": "0",
            "sellTaxBps": "0"
        }
    },
    "trade": {
        "type": "settler_metatransaction",
        "hash": "0x63713b60bf9483fc9853772a2f40a87a5b4cf980a1d4327fcf5f3dd8ea84755f",
        "eip712": {
            "types": {
                "TokenPermissions": [
                    {
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "SlippageAndActions": [
                    {
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "name": "buyToken",
                        "type": "address"
                    },
                    {
                        "name": "minAmountOut",
                        "type": "uint256"
                    },
                    {
                        "name": "actions",
                        "type": "bytes[]"
                    }
                ],
                "PermitWitnessTransferFrom": [
                    {
                        "name": "permitted",
                        "type": "TokenPermissions"
                    },
                    {
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "name": "slippageAndActions",
                        "type": "SlippageAndActions"
                    }
                ],
                "EIP712Domain": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "chainId",
                        "type": "uint256"
                    },
                    {
                        "name": "verifyingContract",
                        "type": "address"
                    }
                ]
            },
            "domain": {
                "name": "Permit2",
                "chainId": 1,
                "verifyingContract": "0x000000000022d473030f116ddee9f6b43ac78ba3"
            },
            "message": {
                "permitted": {
                    "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "amount": "90686870927255889510"
                },
                "spender": "0x12d737470fb3ec6c3deec9b518100bec9d520144",
                "nonce": "2241959297937691820908574931991577",
                "deadline": "1731267428",
                "slippageAndActions": {
                    "recipient": "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
                    "buyToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
                    "minAmountOut": "290635219506036951653520",
                    "actions": [
                        "0x0dfeb41900000000000000000000000012d737470fb3ec6c3deec9b518100bec9d520144000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000004ea887ca0f2c966660000000000000000000000000000000000006e898131631616b1779bad70bc190000000000000000000000000000000000000000000000000000000067310b64",
                        "0x8d68a15600000000000000000000000012d737470fb3ec6c3deec9b518100bec9d520144000000000000000000000000000000000000000000000000000000000000119400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002cc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000001f4a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000",
                        "0xd92aadfb00000000000000000000000012d737470fb3ec6c3deec9b518100bec9d520144000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000000000000000000000000000000000255ec568a707f4d0c0ac96b4191f71ea70c571768b6dd1be1500f74ae7cdc0991c6bb8b03c0000000000000000000000000000000000000000000000000000000067310a78000000000000000000000000b02f39e382c90160eb816de5e0e428ac771d77b50000000000000000000000000000000000000000000000000000000000000120000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000002b43177beebeee00000000000000000000000000000000000000000000000000000000000000000411c42b11bd1882e66ae4d47b7b0cc209d552a429f7651d13e6e7fb52b7b745b579464b2f9688ea48e7b802050d23fc35af4f7560117cbbe2f9474b0032f9663eb2900000000000000000000000000000000000000000000000000000000000000",
                        "0x339a023000000000000000000000000012d737470fb3ec6c3deec9b518100bec9d520144000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000002710000000000000000000000000f6e72db5454dd049d0788e411b06cfaf1685304200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                        "0x38c9c147000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000000000000000000000000000000000000000002710000000000000000000000000bebc44782c7db0a1a60cb6fe97d0b483032ff1c7000000000000000000000000000000000000000000000000000000000000004400000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000843df02124000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000",
                        "0x38c9c1470000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000130000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000044a9059cbb0000000000000000000000009f6601854dee374b1bfaf6350ffd27a97309d431000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                    ]
                }
            },
            "primaryType": "PermitWitnessTransferFrom"
        }
    },
    "zid": "0xc99947e97dd93bca31dedbea"
}
```

### Swap

```json
{
  "endpoint": "/swap",
  "method": "POST",
  "body": {
    "chainId": "number: should match the RPC_URL",
    "sellAmount": "string: uses wei as convertion unit",
    "buyToken": "string: buy token address",
    "walletAddress": "string: swapper address",
    "privateKey": "string: wallet address private key"
  },
  "response": {
    "blockHash": "string",
    "blockNumber": "number",
    "cumulativeGasUsed": "string",
    "from": "string",
    "gasPrice": "string",
    "blobGasPrice": "string",
    "gasUsed": "string",
    "hash": "string",
    "status": "number",
    "to": "string"
  }
}
```

#### Example request
```json
{
    "chainId": 11155111,
    "sellAmount": "100000000000000",
    "sellToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buyToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "walletAddress": "0x8f2BB5978b1405a697212c12d703d60A4B62e476",
    "privateKey": ":)"
}
```

#### Example response

```json
{
    "blockHash": "0x7ae02047ae8d828cf7b5c496042f85079b75b0fae81b47edc0f4a6d7eaf8912f",
    "blockNumber": 7055750,
    "cumulativeGasUsed": "21000",
    "from": "0x8f2BB5978b1405a697212c12d703d60A4B62e476",
    "gasPrice": "35950000000",
    "blobGasUsed": "",
    "blobGasPrice": "",
    "gasUsed": "21000",
    "hash": "0xa75ea2c12e55df9b50060d5e57a167cfa955e852784a0b7d9b295bb5d6744446",
    "status": 1,
    "to": "0x70bf6634eE8Cb27D04478f184b9b8BB13E5f4710"
}
```

### Transaction status

```json
{
  "endpoint": "/swap/transaction/:txHash",
  "method": "GET",
  "Route parameter": {
    "txHash": "string"
  },
  "response": {
    "blockNumber": "number",
    "blockHash": "string",
    "chainId": "string",
    "data": "string",
    "from": "string",
    "gasLimit": "string",
    "gasPrice": "string",
    "hash": "string",
    "maxFeePerGas": "string",
    "maxPriorityFeePerGas": "string",
    "nonce": "number",
    "to": "string"
  }
}
```

#### Example request
```localhost:3000/swap/transaction/0x97b97f96fb5f39afbb01503d49b44fa5ce76968f97dcdf72a14a2b76fd33563b```

#### Example response

```json
{
    "blockNumber": 7051290,
    "blockHash": "0x215319e6b7f29887b5da00591cbc2fa703c04212343a8ffc416fe77bce7afef3",
    "chainId": "11155111",
    "data": "0x",
    "from": "0x8f2BB5978b1405a697212c12d703d60A4B62e476",
    "gasLimit": "212242",
    "gasPrice": "45540000000",
    "hash": "0x97b97f96fb5f39afbb01503d49b44fa5ce76968f97dcdf72a14a2b76fd33563b",
    "maxFeePerGas": "45540000000",
    "maxPriorityFeePerGas": "45540000000",
    "nonce": 0,
    "signature": {
        "networkV": 0,
        "r": "0x83a26b0a927a0d6f25dc0f8f7cbd8f9f7d2476da83d92330928f2d5ef47ea577",
        "s": "0x3207d2dd4beb4df5b368b1630bbb09f6be71d08432754da97a47d9fad604cd7f",
        "v": 28
    },
    "to": "0x70bf6634eE8Cb27D04478f184b9b8BB13E5f4710",
    "index": 0,
    "type": 2,
    "value": "0"
}
```

## Assumptions

- We tested using the sepolia infura RPC to make and retrieve transactions.
- I hard coded chainId 1 in retrieveQuote. This can be easily modified by extracting the value from `retrieveQuoteDTO`, but I left as is because the 0x API supports limited chainIDs and using 1 is pretty standard.

## Security

### Private keys

Passing private keys through an API is not secure and in the real world we shouldn't be doing this. I provide an extra method which allows users to send already signed transactions through the api, ergo, never exposing their private key to a third party.

I didn't add an extra endpoint that uses it, but we have it implemented inside the `EthersService`, it's name is `broadcastTransaction`.


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
