import { useProgram, useTransferNFT } from "@thirdweb-dev/react/solana";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import UseMutationResult from "@thirdweb-dev/react/solana/dist/useMutationResult";
import { TransactionResult } from "@thirdweb-dev/sdk/solana";


export default function CreateTransfer() {
    const sdk = ThirdwebSDK.fromNetwork("devnet");
    const programAddress = 'G7zfkH3x5eAdMM6e3oAuFZfnepHwmkzAaMnim5nf6DVW';
    const receiverAddress = '8YB9vvdKu1LbZqf9po8MUtUATbUDLAtNEvZviYgZpygv';
    const tokenAddress = '59VGwZLPQxyyPbDVqPn63qeURa5S16Gpf1DaozTgVYHh';
    const { program } = useProgram("G7zfkH3x5eAdMM6e3oAuFZfnepHwmkzAaMnim5nf6DVW");
    const { mutateAsync: transfer, isLoading, error } = useTransferNFT(program);
  
  return (
    <button
      onClick={() => transfer({
        receiverAddress: receiverAddress,
        tokenAddress: tokenAddress
      })}
    >
      Transfer
    </button>
  )
}