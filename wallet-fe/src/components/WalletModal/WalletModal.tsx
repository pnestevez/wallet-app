import Modal from "../Modal";
import Input from "../Input";
import { useInput } from "../Input/useInput";
import { error, noError } from "../../utils/builders";
import { WALLET_ADDRESS_REGEX } from "../../utils/rejex";
import { TWallet } from "../../contracts/wallet.contract";

export type WalletModalProps = {
  wallets: TWallet[];
  onCancel: () => void;
  onSave: (address: string) => void;
  loading: boolean;
};

const WalletModal = ({
  wallets,
  onCancel,
  onSave,
  loading,
}: WalletModalProps): JSX.Element => {
  const address = useInput<string>({
    value: "",
    validate: (value) => {
      if (!WALLET_ADDRESS_REGEX.test(value)) return error("Invalid format");
      if (wallets.find((w) => w.address === value))
        return error("Wallet already added");

      return noError();
    },
  });

  return (
    <Modal
      title="Add a new wallet"
      onCancel={onCancel}
      onSave={() => onSave(address.value)}
      disabled={loading || address.hasError}
    >
      <Input
        type="text"
        placeholder="Address"
        value={address.value}
        onChange={(e) => address.onChange(e.target.value)}
        hasChanged={address.hasChanged}
        hasError={address.hasError}
        errorMsg={address.errorMsg}
        disabled={loading}
      />
    </Modal>
  );
};

export default WalletModal;
