import { Injectable } from '@nestjs/common';
// import { RetrieveQuoteDTO } from './dto/retrieve-quote.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwapService {
  private apiUrl: string;
  constructor(private readonly configService: ConfigService) {
    // const api = this.configService.get<string>('API_BASE_URL');
  }

  // async retrieveQuote(retrieveQuoteDTO: RetrieveQuoteDTO) {
  // }
}
