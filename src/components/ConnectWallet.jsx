/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

function ConnectWallet({ onWalletConnected }) {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        onWalletConnected(address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const changeWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        await connectWallet();
      } catch (error) {
        console.error("Error changing wallet:", error);
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          onWalletConnected(accounts[0]);
        } else {
          setWalletAddress(null);
          onWalletConnected(null);
        }
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
      };
    }
  }, [onWalletConnected]);

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {walletAddress ? (
        <button
          onClick={changeWallet}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {shortenAddress(walletAddress)}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;