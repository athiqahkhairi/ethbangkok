import { useState, useEffect } from "react";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
import RPC from "../ethersRPC"; // Make sure to create this file

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
};

const web3auth = new Web3AuthNoModal(web3AuthOptions);
const authadapter = new AuthAdapter();
web3auth.configureAdapter(authadapter);

const Web3AuthTest = () => {
    const [provider, setProvider] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                await web3auth.init();
                setProvider(web3auth.provider);

                if (web3auth.connected) {
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        try {
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
                loginProvider: "google",
            });
            setProvider(web3authProvider);
            if (web3auth.connected) {
                setLoggedIn(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getUserInfo = async () => {
        const user = await web3auth.getUserInfo();
        uiConsole(user);
    };

    const logout = async () => {
        await web3auth.logout();
        setProvider(null);
        setLoggedIn(false);
        uiConsole("logged out");
    };

    const getAccounts = async () => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const address = await RPC.getAccounts(provider);
        uiConsole(address);
    };

    const getBalance = async () => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const balance = await RPC.getBalance(provider);
        uiConsole(balance);
    };

    const signMessage = async () => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const signedMessage = await RPC.signMessage(provider);
        uiConsole(signedMessage);
    };

    const sendTransaction = async () => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        uiConsole("Sending Transaction...");
        const receipt = await RPC.sendTransaction(provider);
        uiConsole(receipt);
    };

    function uiConsole(...args) {
        const el = document.querySelector("#console>p");
        if (el) {
            el.innerHTML = JSON.stringify(args || {}, null, 2);
            console.log(...args);
        }
    }

    const loggedInView = (
        <>
            <div className="flex-container">
                <div>
                    <button onClick={getUserInfo} className="card">
                        Get User Info
                    </button>
                </div>
                <div>
                    <button onClick={getAccounts} className="card">
                        Get Accounts
                    </button>
                </div>
                <div>
                    <button onClick={getBalance} className="card">
                        Get Balance
                    </button>
                </div>
                <div>
                    <button onClick={signMessage} className="card">
                        Sign Message
                    </button>
                </div>
                <div>
                    <button onClick={sendTransaction} className="card">
                        Send Transaction
                    </button>
                </div>
                <div>
                    <button onClick={logout} className="card">
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );

    const unloggedInView = (
        <div className="flex-container">
            <button onClick={login} className="card">
                Login with Google
            </button>
        </div>
    );

    return (
        <div className="container">
            <h1 className="title">
                <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/no-modal" rel="noreferrer">
                    Web3Auth{" "}
                </a>
                & React Quick Start
            </h1>

            <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
            <div id="console" style={{ whiteSpace: "pre-line" }}>
                <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
        </div>
    );
};

export default Web3AuthTest;