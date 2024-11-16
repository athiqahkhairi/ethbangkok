
import { ethers } from 'ethers'
import Contract from '../contract/LED.json'

const LED = () => {
    const contractAddress = "0xceF52CE0b79Cb3AF65E9F48E28b7ab78Bb8fdC3b"
    const contractABI = Contract.abi

    const turnOn = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        await contract.turnOn()
    }

    const turnOff = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        await contract.turnOff()
    }

    return (
        <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl mb-4">LED</h2>
        <div className="buttons flex items-center justify-center space-x-4">
          <button onClick={turnOn} className="bg-green-500 text-white px-4 py-2 rounded">Turn On</button>
          <button onClick={turnOff} className="bg-red-500 text-white px-4 py-2 rounded">Turn Off</button>
        </div>
      </div>
    </div>
    )
}

export default LED