import Modal from "../Modal";
import Input from "../Input";
import { useInput } from "../Input/useInput";
import { error, noError } from "../../utils/builders";
import { TRate } from "../../contracts/rate.contract";

export type RateModalProps = {
  selectedRate: TRate;
  onCancel: () => void;
  onSave: (rate: number) => void;
  loading: boolean;
};

const RateModal = ({
  selectedRate,
  onCancel,
  onSave,
  loading,
}: RateModalProps): JSX.Element => {
  const rate = useInput<number>({
    value: selectedRate.rate,
    validate: (value) => {
      if (value <= 0) return error("Invalid rate");
      return noError();
    },
  });

  return (
    <Modal
      title={`Edit ${selectedRate?.name} exchange rate`}
      onCancel={onCancel}
      onSave={() => onSave(rate.value)}
      disabled={loading || rate.hasError}
    >
      <Input
        type="number"
        step="0.00001"
        placeholder="Rate"
        value={rate.value}
        onChange={(e) => {
          const _value = Number(e.target.value);
          if (_value < 0) return;

          rate.onChange(_value);
        }}
        hasChanged={rate.hasChanged}
        hasError={rate.hasError}
        errorMsg={rate.errorMsg}
        disabled={loading}
      />
    </Modal>
  );
};

export default RateModal;
