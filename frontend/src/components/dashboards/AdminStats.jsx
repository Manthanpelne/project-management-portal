import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { Users, Briefcase, FileText, Activity, Clock } from 'lucide-react';

const AdminStats = () => {
  const { user } = useContext(AuthContext);
  const [liveStats, setLiveStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    pendingReports: 0,
    recentProjects: [] // Store the latest project data here
  });

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const res = await axios.get('https://project-management-portal-cn7a.onrender.com/api/admin/get-reports', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        const summary = res.data.summary;
        const pendingCount = summary.projectsByStatus.find(s => s._id === 'Pending')?.count || 0;

        setLiveStats({
          totalUsers: summary.totalUsers,
          totalProjects: summary.totalProjects,
          pendingReports: pendingCount,
          // Sort by date and take the last 5
          recentProjects: res.data.detailedProjects.slice(0, 5) 
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    if (user?.token) fetchLiveStats();
  }, [user.token]);

  return (
    <div className="space-y-8">
      {/* 1. Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={liveStats.totalUsers} icon={<Users />} color="bg-blue-500" />
        <StatCard label="Active Projects" value={liveStats.totalProjects} icon={<Briefcase />} color="bg-green-500" />
        <StatCard label="Pending Tasks" value={liveStats.pendingReports} icon={<FileText />} color="bg-orange-500" />
        <StatCard label="System Load" value="Optimal" icon={<Activity />} color="bg-purple-500" />
      </div>

      {/* 2. Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2 font-bold text-gray-700">
          <Clock size={18} className="text-blue-500" /> 
          Recent System Activity
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {liveStats.recentProjects.length > 0 ? (
                liveStats.recentProjects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{proj.title}</td>
                    <td className="px-6 py-4 text-gray-600">{proj.clientId?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(proj.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                    No recent activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper component for Cards
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 transition-all hover:shadow-md">
    <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default AdminStats;