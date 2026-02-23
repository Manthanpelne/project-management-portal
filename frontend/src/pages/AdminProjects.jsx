import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';

const AdminProjects = () => {
  const { user } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', clientId: '' });

  useEffect(() => {
    // Fetch both clients (for the dropdown) and current projects
    const fetchData = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const usersRes = await axios.get('https://project-management-portal-cn7a.onrender.com/api/admin/users', config);
      // Filter only users with the 'client' role
      setClients(usersRes.data.filter(u => u.role === 'client'));
      
      // Note: You'll need a GET /api/admin/projects route to see all projects
      const projRes = await axios.get('https://project-management-portal-cn7a.onrender.com/api/admin/all-projects', config);
      setProjects(projRes.data);
    };
    fetchData();
  }, [user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post('https://project-management-portal-cn7a.onrender.com/api/admin/projects', formData, config);
      setProjects([...projects, res.data]);
      setFormData({ title: '', description: '', clientId: '' });
      alert("Project Assigned!");
    } catch (err) {
      alert("Error creating project");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Project Management</h1>
        
        {/* CREATE PROJECT FORM */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Assign New Project</h2>
          <div className="grid grid-cols-1 gap-4">
            <input 
              placeholder="Project Title" className="border p-2 rounded" required
              value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <textarea 
              placeholder="Description" className="border p-2 rounded"
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <select 
              className="border p-2 rounded" required
              value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})}
            >
              <option value="">Select a Client</option>
              {clients.map(c => <option key={c._id} value={c._id}>{c.name} ({c.email})</option>)}
            </select>
            <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Project</button>
          </div>
        </form>

        {/* PROJECT LIST */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Project Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Client</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id} className="border-b">
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">{p.status}</span>
                  </td>
                  <td className="p-4">{p.clientId?.name || 'Assigned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;