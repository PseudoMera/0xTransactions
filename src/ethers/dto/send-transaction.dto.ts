export class SendTransactionDTO {
  constructor(
    public to: string,
    public from: string,
    public value: string,
    public gasLimit: string,
    public gasPrice: string,
    public chainId: number,
    public nonce: number,
  ) {}
}
