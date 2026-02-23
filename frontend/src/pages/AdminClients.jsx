import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar';
import { UserPlus, Edit, Trash2, Mail } from 'lucide-react';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/clients', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm("Are you sure? This will remove the client's access.")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setClients(clients.filter(c => c._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
            <p className="text-gray-500">Manage your business accounts and project owners</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <UserPlus size={18} /> Add New Client
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Contact Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{client.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={14} /> {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                      <button 
                        onClick={() => deleteClient(client._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {clients.length === 0 && (
            <div className="p-10 text-center text-gray-500">No clients found in the system.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminClients;