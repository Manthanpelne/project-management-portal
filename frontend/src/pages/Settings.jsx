import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { ShieldCheck, User, Camera, Mail, Save } from 'lucide-react';
import { AuthContext } from '../context/authContext';

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext); //
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profileImage: user?.profileImage || ''
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/users/profile', 
        { name: profile.name, email: profile.email, profileImage: profile.profileImage },
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
     updateUser(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.log("erro",err)
      alert("Failed to update profile info.");
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return alert("New passwords do not match!");

    try {
      await axios.put('http://localhost:5000/api/users/profile', 
        { password: passwords.new },
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
      alert("Password updated successfully!");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      alert("Failed to update password.");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
          <p className="text-gray-500">Manage your profile information and security preferences</p>
        </header>

        <div className="space-y-6">
          {/* Section 1: Personal Information */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 font-bold text-gray-700 mb-6">
              <User className="text-blue-500" size={20} /> Personal Information
            </h3>
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <img 
                    src={profile.profileImage || 'https://via.placeholder.com/100'} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button type="button" className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 hover:text-blue-500">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Profile Picture</p>
                  <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-600 ml-1">Full Name</label>
                  <input 
                    type="text" value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600 ml-1">Email Address</label>
                  <input 
                    type="email" value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                <Save size={18} /> Save Changes
              </button>
            </form>
          </section>

          {/* Section 2: Security */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 font-bold text-gray-700 mb-6">
              <ShieldCheck className="text-red-500" size={20} /> Change Password
            </h3>
            <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="password" placeholder="New Password" 
                className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                required
              />
              <input 
                type="password" placeholder="Confirm New Password" 
                className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                required
              />
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition w-max">
                Update Password
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;