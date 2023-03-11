import { useMemo, useState } from "react";
import cn from "classnames";
import { DraggableCard, DroppableColumn } from "../DnD";
import Card from "../Card";
import RateModal from "../RateModal";
import WalletModal from "../WalletModal";
import { TRate } from "../../contracts/rate.contract";
import { TWallet } from "../../contracts/wallet.contract";

import { useToast } from "../Toast/useToast";
import styles from "./Wallets.module.css";

export type WalletsProps = {
  rates: TRate[];
  loadingRates: boolean;
  handleUpdateRate: (
    id: number,
    rate: number,
    successCallback?: () => void,
    errorCallback?: () => void
  ) => void;
  wallets: TWallet[];
  loadingWallet: boolean;
  handleAddWallet: (
    address: string,
    successCallback: () => void,
    errorCallback?: () => void
  ) => Promise<void>;
  handleRemoveWallet: (address: string) => void;
  handleMoveCard: (address: string, toIndex: number) => void;
};

const Wallets = ({
  rates,
  loadingRates,
  handleUpdateRate,
  wallets,
  loadingWallet,
  handleAddWallet,
  handleRemoveWallet,
  handleMoveCard,
}: WalletsProps): JSX.Element => {
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const _selectedRate = useMemo(
    () => rates.find((r) => r.id === selectedRate),
    [rates, selectedRate]
  );
  const [showRateModal, setShowRateModal] = useState<boolean>(false);
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  const { Toast, setToast } = useToast();
  return (
    <>
      <div className={styles.wallets}>
        <div className={styles.rates}>
          {rates.map((r) => (
            <button
              key={`rate-button-${r.id}`}
              className={cn(styles.rate, {
                [styles.selected]: _selectedRate?.id === r.id,
                [styles.notSelected]: _selectedRate?.id !== r.id,
              })}
              onClick={() =>
                setSelectedRate(selectedRate === r.id ? null : r.id)
              }
            >
              <div className={styles.code}>{r.code}</div>
            </button>
          ))}

          {selectedRate && (
            <div className={styles.edit} onClick={() => setShowRateModal(true)}>
              <img className={styles.icon} src="/edit.svg" alt="edit" />
            </div>
          )}
        </div>

        <div className={styles.walletsList}>
          <button
            className={styles.addButton}
            onClick={() => setShowWalletModal(true)}
          >
            <img className={styles.icon} src="/plus.svg" alt="plus" />
          </button>

          <DroppableColumn key="droppable-wallets-column">
            <div className={styles.list} id="wallets-column">
              {wallets.map((w, i) => {
                return (
                  <DraggableCard
                    key={w.address}
                    cardId={w.address}
                    cardIndex={i}
                    handleMoveCard={handleMoveCard}
                  >
                    <Card
                      index={i}
                      address={w.address}
                      {...(_selectedRate && {
                        equivalence: `${_selectedRate.symbol} ${(
                          w.balance / _selectedRate.rate
                        ).toFixed(2)}`,
                      })}
                      balance={w.balance}
                      isOlder={w.isOlder}
                      handleRemoveWallet={handleRemoveWallet}
                    />
                  </DraggableCard>
                );
              })}
            </div>
          </DroppableColumn>
        </div>
      </div>

      {showWalletModal && (
        <WalletModal
          wallets={wallets}
          onCancel={() => setShowWalletModal(false)}
          onSave={(address: string) => {
            handleAddWallet(
              address,
              () => {
                setShowWalletModal(false);
              },
              () => setToast("Error adding wallet")
            );
          }}
          loading={loadingWallet}
        />
      )}

      {_selectedRate && showRateModal && (
        <RateModal
          selectedRate={_selectedRate}
          onCancel={() => setShowRateModal(false)}
          onSave={(rate: number) =>
            handleUpdateRate(
              _selectedRate.id,
              rate,
              () => {
                setShowRateModal(false);
              },
              () => setToast("Error updating rate")
            )
          }
          loading={loadingRates}
        />
      )}

      {Toast}
    </>
  );
};

export default Wallets;
