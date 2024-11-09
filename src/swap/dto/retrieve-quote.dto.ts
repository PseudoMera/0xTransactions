export class RetrieveQuoteDTO {
  constructor(
    public chainID: number,
    public buyToken: string,
    public sellToken: string,
    public sellAmount: string,
    public taker: string,
  ) {}
}
