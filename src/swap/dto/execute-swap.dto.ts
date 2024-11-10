export class ExecuteSwapDTO {
  constructor(
    public sellToken: string,
    public buyToken: string,
    public sellAmount: string,
    public walletAddress: string,
    public privateKey: string,
    public chainId: string,
  ) {}
}
