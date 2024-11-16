import { useWeb3Auth } from "../context/Web3AuthContext";
import { Link } from 'react-router-dom';
import Web3AuthButton from "../components/Web3AuthButton";

const Home = () => {
  const { user, isLoading } = useWeb3Auth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300">
      <div className="bg-slate-400 flex justify-between items-center p-4">
        <Web3AuthButton />
      </div>

      {user ? (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/register-car" 
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">Register Car</h2>
              <p className="text-gray-600">Register your vehicle in the system</p>
            </Link>

            <Link 
              to="/registered-cars" 
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">View Registered Cars</h2>
              <p className="text-gray-600">Check your registered vehicles and fines</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Vehicle Registration System</h1>
            <p className="text-lg mb-4">Please connect your wallet to continue</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;