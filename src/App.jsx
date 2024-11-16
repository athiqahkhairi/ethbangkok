import { useState } from 'react';
// import './App.css';
import Navbar from './components/Navbar';
import LED from './components/LED';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewCars from './pages/ViewCars'
import RegisterCar from './pages/RegisterCar'

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  // const contractAddress = ""

  const handleWalletConnected = (address) => {
    setWalletAddress(address);
  };

  return (
    // <div className="App bg-slate-300">
    //   <div className="navbar">
    //     <Navbar onWalletConnected={handleWalletConnected} />
    //   </div>
    //   <div className="led">
    //     {walletAddress && (
    //       <LED />
    //     )}
    //   </div>
      
    // </div>
    <Router>
      <div className="App bg-slate-300 min-h-screen">
        <div className="navbar sticky top-0 z-50">
          <Navbar onWalletConnected={handleWalletConnected} />
        </div>
        
        <Routes>
          <Route path="/" element={walletAddress && <LED />} />
          <Route path="/registered-cars" element={<ViewCars />} />
          <Route path="/register-car" element={<RegisterCar />} />
          {/* <Route path="/car-details/:carId" element={<CarDetails />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;