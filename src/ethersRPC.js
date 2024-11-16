import { ethers } from "ethers";

export default class EthereumRpc {
    static async getAccounts(provider) {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            return address;
        } catch (error) {
            return error;
        }
    }

    static async getBalance(provider) {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            const balance = await ethersProvider.getBalance(address);
            return ethers.formatEther(balance);
        } catch (error) {
            return error;
        }
    }

    static async signMessage(provider) {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const originalMessage = "YOUR_MESSAGE";
            const signedMessage = await signer.signMessage(originalMessage);
            return signedMessage;
        } catch (error) {
            return error;
        }
    }

    static async sendTransaction(provider) {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
            const amount = "0.001";
            const tx = await signer.sendTransaction({
                to: destination,
                value: ethers.parseEther(amount),
                maxPriorityFeePerGas: "5000000000",
                maxFeePerGas: "6000000000000",
            });
            return tx;
        } catch (error) {
            return error;
        }
    }
} 