import cn from "classnames";
import styles from "./Card.module.css";

export type CardProps = {
  index: number;
  address: string;
  equivalence?: string;
  balance: number;
  isOlder: boolean;
  handleRemoveWallet: (address: string) => void;
};

const Card = ({
  index,
  address,
  equivalence,
  balance,
  isOlder,
  handleRemoveWallet,
}: CardProps): JSX.Element => (
  <div
    className={cn(styles.card, {
      [styles.pair]: !(index % 2),
      [styles.odd]: index % 2,
    })}
  >
    <div className={styles.header}>
      <div className={styles.address}>{address}</div>

      <img
        className={cn(styles.trash)}
        src="/trash.svg"
        alt="trash"
        onClick={() => handleRemoveWallet(address)}
      />
    </div>

    {equivalence && <div className={styles.equivalence}>{equivalence}</div>}

    <div className={styles.balance}>
      <img className={cn(styles.eth)} src="/eth.svg" alt="eth" />
      {balance} ETH
    </div>

    {isOlder && (
      <div className={styles.warning}>
        <img className={cn(styles.alert)} src="/alert.svg" alt="alert" />
        this wallet is old
      </div>
    )}
  </div>
);

export default Card;
