import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SwapService } from './swap.service';
import { RetrieveQuoteDTO } from './dto/retrieve-quote.dto';
import { ExecuteSwapDTO } from './dto/execute-swap.dto';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get()
  retrieveQuote(@Query() retrieveQuoteDTO: RetrieveQuoteDTO) {
    return this.swapService.retrieveQuote(retrieveQuoteDTO);
  }

  @Post()
  executeSwap(@Body() executeSwapDto: ExecuteSwapDTO) {
    return this.swapService.sendTransaction(executeSwapDto);
  }

  @Get('/transaction/:txHash')
  retrieveTransactionStatus(@Param('txHash') txHash: string) {
    return this.swapService.retrieveTransactionStatus(txHash);
  }
}
