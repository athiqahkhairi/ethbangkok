/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract/contract'
import { useNavigate } from 'react-router-dom'

const ViewCars = () => {
  const [icNumber, setIcNumber] = useState('')
  const [registeredCars, setRegisteredCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [carFines, setCarFines] = useState({})
  const navigate = useNavigate()

  const fetchUnpaidFines = async (plateNumber) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      
      const unpaidFines = await contract.getTotalUnpaidFines(plateNumber)
      return ethers.formatEther(unpaidFines)
    } catch (err) {
      console.error(`Error fetching fines for ${plateNumber}:`, err)
      return '0'
    }
  }

  const fetchRegisteredCars = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setRegisteredCars([])
    setCarFines({})

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      try {
        const plateNumbers = await contract.getPlateNumbersByIC(icNumber)
        
        if (plateNumbers && plateNumbers.length > 0) {
          setRegisteredCars(plateNumbers)
          
          const fines = {}
          for (const plateNumber of plateNumbers) {
            fines[plateNumber] = await fetchUnpaidFines(plateNumber)
          }
          setCarFines(fines)
        } else {
          setError('This IC number is not registered in the system')
        }
      } catch (err) {
        setError('This IC number is not registered in the system')
      }
    } catch (err) {
      if (err.message.includes('execution reverted')) {
        setError('This IC number is not registered in the system')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const totalUnpaid = async (plateNumber) => {
      const provider = new ethers.BrowserProvider(window.ethereum) // tukar dengan JsonRpcProvider kalau dah deploy
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const unpaid = contract.getTotalUnpaid(plateNumber);
      return unpaid;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">View Registered Cars</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={fetchRegisteredCars} className="space-y-4">
          <div>
            <label htmlFor="icNumber" className="block text-sm font-medium text-gray-700 mb-1">
              IC Number
            </label>
            <input
              id="icNumber"
              type="text"
              value={icNumber}
              onChange={(e) => setIcNumber(e.target.value)}
              placeholder="Enter IC number"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Fetching...' : 'View Cars'}
          </button>
        </form>


        {registeredCars.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Registered Cars</h2>
            <ul className="space-y-2">
              {registeredCars.map((plateNumber, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/car-details/${plateNumber}`)}
                >
                  <span>{plateNumber}</span>
                  <span className="text-sm text-gray-600">
                    Unpaid: {carFines[plateNumber] || '0'} ETH
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewCars