import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, Briefcase, Settings, LogOut } from 'lucide-react';
import { AuthContext } from '../context/authContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define links for each role
  const menuConfig = {
    admin: [
      { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
      { name: 'User Management', path: '/admin/users', icon: <Users size={20}/> },
      { name: 'Reports', path: '/admin/reports', icon: <Briefcase size={20}/> },
      { name: 'Settings', path: '/settings', icon: <Settings size={20}/> },
    ],
    client: [
      { name: 'Profile', path: '/profile', icon: <UserCircle size={20}/> },
       { name: 'Settings', path: '/settings', icon: <Settings size={20}/> },
    ],
    user: [
      { name: 'My Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20}/> },
      { name: 'Profile', path: '/profile', icon: <UserCircle size={20}/> },
    ],
  };

  const links = menuConfig[user?.role] || [];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 fixed left-0 top-0">
      <h1 className="text-xl font-bold mb-8 text-blue-400 px-2">Portal Pro</h1>
      
      <nav className="flex-1">
        {links.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition mb-1"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition"
      >
        <LogOut size={20}/>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;