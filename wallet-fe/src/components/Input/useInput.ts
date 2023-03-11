import { useState } from "react";

export type UseInputProps<T> = {
  value: T;
  validate?: (value: T) => [boolean, string?];
}

export type UseInputReturnType<T> = {
  value: T;
  onChange: (value: T) => void;
  hasChanged: boolean;
  hasError: boolean;
  errorMsg?: string;
  reset: () => void
}

export const useInput = <T>({
  value: initialValue,
  validate
}: UseInputProps<T>): UseInputReturnType<T> => {
  const [value, setValue] = useState(initialValue);
  const [hasChanged, setHasChanged] = useState(false);
  const [error, setError] = useState<[boolean, string?]>(validate?.(value) || [false]);

  const onChange = (value: T): void => {
    setHasChanged(value !== initialValue);
    setValue(value);
    setError(validate?.(value) || [false]);
  };

  const [hasError, errorMsg] = error;

  const reset = () => {
    setValue(initialValue);
    setHasChanged(false);
  };

  return {
    value,
    onChange,
    hasChanged,
    hasError,
    errorMsg,
    reset
  };
}