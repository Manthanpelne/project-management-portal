import { useContext } from 'react';

import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';
import AdminStats from '../components/dashboards/AdminStats';
import ClientStats from '../components/dashboards/clientStats';
import UserStats from '../components/dashboards/userStats';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 uppercase text-sm tracking-widest font-semibold">{user?.role} Portal</p>
        </header>

        {/* Dynamic Content based on Role */}
        {user?.role === 'admin' && <AdminStats />}
        {user?.role === 'client' && <ClientStats />}
        {user?.role === 'user' && <UserStats />}
      </div>
    </div>
  );
};

export default Dashboard;