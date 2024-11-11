import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, JsonRpcProvider } from 'ethers';
import { SendTransactionDTO } from './dto/send-transaction.dto';

@Injectable()
export class EthersService implements OnModuleInit {
  private provider: JsonRpcProvider;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    this.provider = new JsonRpcProvider(rpcUrl);
  }

  async broadcastTransaction(signedTx: string) {
    try {
      const txResponse = await this.provider.broadcastTransaction(signedTx);
      const receipt = await txResponse.wait();
      return receipt;
    } catch (error) {
      throw new Error(`Failed to broadcast transaction: ${error.message}`);
    }
  }

  async sendTransaction(pk: string, sendTxDTO: SendTransactionDTO) {
    try {
      const signer = new ethers.Wallet(pk).connect(this.provider);
      const nonce = await this.provider.getTransactionCount(signer.address);

      const tx = await signer.sendTransaction({
        to: sendTxDTO.to,
        from: sendTxDTO.from,
        value: ethers.parseUnits(sendTxDTO.value, 'wei'),
        chainId: sendTxDTO.chainId,
        gasLimit: ethers.toBigInt(sendTxDTO.gasLimit),
        gasPrice: ethers.toBigInt(sendTxDTO.gasPrice),
        nonce: nonce,
      });

      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      throw new Error(`Failed to send transaction: ${error.message}`);
    }
  }

  async getTransaction(txHash: string) {
    try {
      const txRes = await this.provider.getTransaction(txHash);
      return txRes;
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }
}
