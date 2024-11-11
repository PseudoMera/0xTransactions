import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RetrieveQuoteDTO } from './dto/retrieve-quote.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RetrieveQuoteResponse } from './interfaces/retrieve-quote.interface';
import { ExecuteSwapDTO } from './dto/execute-swap.dto';
import { EthersService } from 'src/ethers/ethers.service';
import { SendTransactionResponse } from './interfaces/send-transaction.interface';
import { RetrieveTransactionStatusResponse } from './interfaces/retrieve-transaction-status.interface';
@Injectable()
export class SwapService {
  private apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectPinoLogger(SwapService.name)
    private readonly logger: PinoLogger,
    private readonly ethersService: EthersService,
  ) {
    const api = this.configService.get<string>('API_URL');
    if (!api) {
      throw new InternalServerErrorException(
        'Missing required environment variable: API_URL',
      );
    }

    this.apiUrl = api;
  }

  async retrieveQuote(
    retrieveQuoteDTO: RetrieveQuoteDTO,
  ): Promise<RetrieveQuoteResponse> {
    const { buyToken, sellAmount, sellToken, taker } = retrieveQuoteDTO;

    const response = await firstValueFrom(
      this.httpService
        .get(`${this.apiUrl}/quote`, {
          params: {
            sellToken: sellToken,
            buyToken: buyToken,
            sellAmount: sellAmount,
            taker: taker,
            chainId: 1,
          },
          headers: {
            '0x-api-key': this.configService.get<string>('API_KEY'),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(error);
          }),
        ),
    );

    return response.data;
  }

  async sendTransaction(
    executeSwapDTO: ExecuteSwapDTO,
  ): Promise<SendTransactionResponse> {
    const {
      buyToken,
      sellAmount,
      sellToken,
      walletAddress,
      chainId,
      privateKey,
    } = executeSwapDTO;

    try {
      const quote = await this.retrieveQuote({
        buyToken,
        chainID: Number(chainId),
        sellAmount,
        sellToken,
        taker: walletAddress,
      });

      const sendTxRes = await this.ethersService.sendTransaction(privateKey, {
        chainId: Number(chainId),
        from: walletAddress,
        to: quote.transaction.to,
        gasLimit: quote.transaction.gas,
        gasPrice: quote.transaction.gasPrice,
        nonce: 0,
        value: quote.transaction.value,
      });

      if (!sendTxRes) {
        throw new BadRequestException('The transaction could not be completed');
      }

      return {
        blockHash: sendTxRes.blockHash,
        blockNumber: sendTxRes.blockNumber,
        cumulativeGasUsed: sendTxRes.cumulativeGasUsed.toString(),
        from: sendTxRes.from,
        gasPrice: sendTxRes.gasPrice.toString(),
        blobGasUsed: sendTxRes.blobGasUsed?.toString() ?? '',
        blobGasPrice: sendTxRes.blobGasPrice?.toString() ?? '',
        gasUsed: sendTxRes.gasUsed.toString(),
        hash: sendTxRes.hash,
        status: sendTxRes.status ?? -1,
        to: sendTxRes.to,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error executing swap');
    }
  }

  async retrieveTransactionStatus(
    txHash: string,
  ): Promise<RetrieveTransactionStatusResponse> {
    try {
      const txRes = await this.ethersService.getTransaction(txHash);
      if (!txRes) {
        throw new BadRequestException(
          `The transaction ${txHash} can't be retrieved`,
        );
      }

      return {
        blockNumber: txRes.blockNumber ?? -1,
        blockHash: txRes.blockHash ?? '',
        chainId: txRes.chainId.toString(),
        data: txRes.data,
        from: txRes.from,
        gasLimit: txRes.gasLimit.toString(),
        gasPrice: txRes.gasPrice.toString(),
        hash: txRes.hash,
        maxFeePerGas: txRes.maxFeePerGas?.toString() ?? '',
        maxPriorityFeePerGas: txRes.maxPriorityFeePerGas?.toString() ?? '',
        nonce: txRes.nonce,
        signature: {
          networkV: Number(txRes.signature.networkV),
          r: txRes.signature.r,
          s: txRes.signature.s,
          v: txRes.signature.v,
        },
        to: txRes.to,
        index: txRes.index,
        type: txRes.type,
        value: txRes.value.toString(),
      };
    } catch (error) {
      throw new BadRequestException(
        error.message ||
          'Error retrieving transaction status with the given hash',
      );
    }
  }
}
