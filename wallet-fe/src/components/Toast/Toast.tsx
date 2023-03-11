import { useEffect } from "react";
import styles from "./Toast.module.css";

export type ToastProps = {
  title: string;
  onToastDestroy: () => void;
};
const Toast = ({ title, onToastDestroy }: ToastProps): JSX.Element => {
  useEffect(() => {
    const destroyToast = setTimeout(() => {
      onToastDestroy();
    }, 3000);
    return () => {
      clearTimeout(destroyToast);
    };
  }, [onToastDestroy]);

  return (
    <div className={styles.toast} onClick={onToastDestroy}>
      <img className={styles.icon} src="/alert.svg" alt="alert" />

      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default Toast;
