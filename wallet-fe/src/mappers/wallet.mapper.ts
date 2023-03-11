import { APIWallet, TWallet } from "../contracts/wallet.contract";

const walletMapper = {
  toFront: (data: APIWallet): TWallet => ({
    address: data.address,
    balance: data.balance,
    isOlder: data.is_older
  })
}

export default walletMapper