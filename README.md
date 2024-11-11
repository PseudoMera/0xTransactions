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

## API docs


## Assumptions

- We tested using the sepolia infura RPC to make and retrieve transactions

## Security
### Private keys

Passing private keys through an API is not secure and in the real world we shouldn't be doing this. I provide an extra method which allows users to send already signed transactions through the api, ergo, never exposing their private key to a third party.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
