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
            //@ts-expect-error fwfwewf
            console.log(error.response?.data.data);
            throw new BadRequestException(error);
          }),
        ),
    );

    return response.data;
  }

  async sendTransaction(executeSwapDTO: ExecuteSwapDTO) {
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

      return sendTxRes;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error executing swap');
    }
  }

  async retrieveTransactionStatus(txHash: string) {
    try {
      const txRes = await this.ethersService.getTransaction(txHash);
      return txRes;
    } catch (error) {
      throw new BadRequestException(
        error.message ||
          'Error retrieving transaction status with the given hash',
      );
    }
  }
}
