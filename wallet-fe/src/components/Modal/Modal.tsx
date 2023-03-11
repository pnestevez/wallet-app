import styles from "./Modal.module.css";
import cn from "classnames";

export type ModalProps = {
  title: string;
  children: JSX.Element;
  onCancel: () => void;
  onSave: () => void;
  disabled: boolean;
};

const Modal = ({ title, children, onSave, onCancel, disabled }: ModalProps) => (
  <div className={styles.background}>
    <div className={styles.modal}>
      <h2 className={styles.title}>{title}</h2>

      {children}

      <div className={styles.buttons}>
        <button
          className={cn(styles.button, styles.cancel)}
          onClick={() => onCancel()}
        >
          Cancel
        </button>

        <button
          className={cn(styles.button, styles.save)}
          onClick={() => onSave()}
          disabled={disabled}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
