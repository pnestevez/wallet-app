import { useEffect, useState } from "react";
import Wallets from "./Wallets";
import walletApi from "../../services/wallet.api";
import walletMapper from "../../mappers/wallet.mapper";
import { TWallet } from "../../contracts/wallet.contract";
import ratesMapper from "../../mappers/rates.mapper";
import rateMapper from "../../mappers/rate.mapper";
import { TRate } from "../../contracts/rate.contract";

const WalletsContainer = () => {
  const [rates, setRates] = useState<TRate[]>([]);
  const [loadingRates, setLoadingRates] = useState<boolean>(false);

  const handleUpdateRate = async (
    id: number,
    rate: number,
    successCallback?: () => void,
    errorCallback?: () => void
  ) => {
    setLoadingRates(true);

    await walletApi
      .patch(`/rates/${id}`, { rate })
      .then((res) => {
        setRates((prevState) =>
          prevState.map((r) => (r.id === id ? rateMapper.toFront(res.data) : r))
        );

        successCallback?.();
      })
      .catch((e) => {
        console.error(e);

        errorCallback?.();
      });

    setLoadingRates(false);
  };

  useEffect(() => {
    setLoadingRates(true);

    walletApi
      .get("/rates")
      .then((res) => {
        setRates(ratesMapper.toFront(res.data));
        setLoadingRates(false);
      })
      .catch((e) => {
        console.error(e);
        setLoadingRates(false);
      });
  }, []);

  const [wallets, setWallets] = useState<TWallet[]>([]);
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);

  const handleAddWallet = async (
    address: string,
    successCallback?: () => void,
    errorCallback?: () => void
  ): Promise<void> => {
    setLoadingWallet(true);

    await walletApi
      .get(`/wallets/${address}`)
      .then((res) => {
        setWallets((prevState) => [
          walletMapper.toFront(res.data),
          ...prevState,
        ]);

        successCallback?.();
      })
      .catch((e) => {
        console.error(e);

        errorCallback?.();
      });

    setLoadingWallet(false);
  };

  const handleRemoveWallet = (address: string) =>
    setWallets((prevState) => prevState.filter((w) => w.address !== address));

  const handleMoveCard = (address: string, toIndex: number) => {
    setWallets((prevState) => {
      const _wallet = prevState.find((w) => w.address === address);
      if (!_wallet) return prevState;

      const _wallets = structuredClone(prevState).filter(
        (w: TWallet) => w.address !== address
      );
      _wallets.splice(toIndex, 0, { ..._wallet });

      return _wallets;
    });
  };

  return (
    <Wallets
      {...{
        rates,
        loadingRates,
        handleUpdateRate,
        wallets,
        loadingWallet,
        handleAddWallet,
        handleRemoveWallet,
        handleMoveCard,
      }}
    />
  );
};

export default WalletsContainer;
