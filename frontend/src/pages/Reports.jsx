import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar';
import { Download, Users, Briefcase, PieChart, FileText } from 'lucide-react';
import { Parser } from "@json2csv/plainjs"

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('https://project-management-portal-cn7a.onrender.com/api/admin/get-reports', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setReportData(res.data);
      } catch (err) {
        console.error("Error fetching reports", err);
      }
    };
    fetchReports();
  }, [user.token]);

const handleExport = () => {
  if (!reportData || !reportData.detailedProjects) return;

  try {
    const opts = {
      fields: [
        { label: 'Project Title', value: 'title' },
        { label: 'Status', value: 'status' },
        { label: 'Client Name', value: 'clientId.name' },
        { label: 'Client Email', value: 'clientId.email' },
        { label: 'Date Created', value: (row) => new Date(row.createdAt).toLocaleDateString() }
      ]
    };

    const parser = new Parser(opts);
    const csv = parser.parse(reportData.detailedProjects);

    // Standard download logic
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'System_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (err) {
    console.error("Export Error:", err);
    alert("Export failed. Check console for details.");
  }
};

  if (!reportData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">System Reports</h1>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* 1. Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Users className="text-blue-600"/>} label="Total Users" value={reportData.summary.totalUsers} color="bg-blue-100" />
          <StatCard icon={<Users className="text-purple-600"/>} label="Active Clients" value={reportData.summary.totalClients} color="bg-purple-100" />
          <StatCard icon={<Briefcase className="text-orange-600"/>} label="Total Projects" value={reportData.summary.totalProjects} color="bg-orange-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 2. Project Status Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 font-bold mb-4 text-gray-700">
              <PieChart size={18} /> Status Distribution
            </h3>
            <div className="space-y-4">
              {reportData.summary.projectsByStatus.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">{item._id}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Detailed Project List Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="flex items-center gap-2 font-bold text-gray-700">
                <FileText size={18} /> Recent Project Details
              </h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportData.detailedProjects.slice(0, 5).map((proj) => (
                  <tr key={proj._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{proj.title}</td>
                    <td className="px-6 py-4">{proj.clientId?.name || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean code
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`${color} p-3 rounded-lg`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default Reports;