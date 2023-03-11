import cn from "classnames";
import styles from "./Input.module.css";

export type InputProps = {
  type: string;
  step?: string;
  placeholder?: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasChanged: boolean;
  hasError?: boolean;
  errorMsg?: string;
  disabled?: boolean;
};

const Input = ({
  type,
  step,
  placeholder,
  value,
  onChange,
  hasChanged,
  hasError,
  errorMsg,
  disabled,
}: InputProps): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={cn(styles.input, {
          [styles.error]: hasChanged && hasError,
        })}
        {...{
          type,
          step,
          placeholder,
          value,
          onChange,
          disabled,
        }}
      />

      {hasChanged && hasError && (
        <div className={styles.errorMsg}>{errorMsg}</div>
      )}
    </div>
  );
};

export default Input;
