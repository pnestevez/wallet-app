import { useState } from "react";
import Toast, { ToastProps } from "./Toast";

export const useToast = (): {
  Toast: JSX.Element | null;
  setToast: (title: string) => void;
} => {
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState<ToastProps>({
    title: "",
    onToastDestroy: () => setShow(false),
  });

  const _setToast = (title: string) => {
    setToast({ ...toast, title });
    setShow(true);
  };

  const component = show ? <Toast {...toast} /> : null;

  return { Toast: component, setToast: _setToast };
};
