/* eslint-disable react/prop-types */
import ConnectWallet from './ConnectWallet';
import { Link } from 'react-router-dom'; 

function Navbar({ onWalletConnected }) {
  return (
    <nav className="bg-slate-400 flex justify-between items-center p-4 w-full top-0 left-0 z-10">
      <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
        Home
      </Link>
      <Link 
      to="/register-car" 
      className="text-gray-700 hover:text-blue-600 transition-colors"
      >
        Register Car
      </Link>
      <Link 
  to="/registered-cars" 
  className="text-gray-700 hover:text-blue-600 transition-colors"
>
  Registered Cars
</Link>
        <div>
        <ConnectWallet onWalletConnected={onWalletConnected} />
      </div>
    </nav>
  );
}

export default Navbar;