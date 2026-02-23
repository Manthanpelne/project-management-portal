import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const ClientStats = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await axios.get('https://project-management-portal-cn7a.onrender.com/api/client/projects', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching client projects");
      }
    };
    fetchMyProjects();
  }, [user.token]);

  const updateStatus = async (projectId, newStatus) => {
    try {
      await axios.put(`https://project-management-portal-cn7a.onrender.com/api/client/project/${projectId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
      // Update local state to reflect change
      setProjects(projects.map(p => p._id === projectId ? { ...p, status: newStatus } : p));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">My Assigned Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? <p className="text-gray-500">No projects assigned yet.</p> : 
          projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
                <span className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-bold">
                  Current Status: {project.status}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <select 
                  className="border p-1 rounded text-sm"
                  onChange={(e) => updateStatus(project._id, e.target.value)}
                  value={project.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ClientStats;