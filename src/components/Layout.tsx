import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 bg-green-600 flex items-center justify-center">
          <h1 className="text-white text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <Link
            to="/"
            className="flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md text-gray-700 hover:text-green-600"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/landlords"
            className="flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md text-gray-700 hover:text-green-600 mt-2"
          >
            <Users size={20} />
            <span>Landlords</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md text-gray-700 hover:text-green-600 mt-2 w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;