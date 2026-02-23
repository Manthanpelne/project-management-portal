import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/user/${selectedUser._id}`, selectedUser, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setIsModalOpen(false);
      window.location.reload(); 
    } catch (err) {
      alert("Update failed");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, [user.token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUsers(users.filter(u => u._id !== id));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      u.role === 'admin' ? 'bg-red-100 text-red-700' : 
                      u.role === 'client' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
    <button onClick={() => openEditModal(u)} className="text-blue-600 hover:underline">Edit</button>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit User Role</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  className="w-full border p-2 rounded bg-gray-50" 
                  value={selectedUser.name} readOnly 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select 
                  className="w-full border p-2 rounded"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
                    <button 
                      onClick={() => handleDelete(u._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;