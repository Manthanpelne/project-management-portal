const UserStats = () => (
  <div className="bg-white p-10 rounded-xl shadow-sm text-center max-w-2xl mx-auto">
    <div className="mb-4 text-blue-500 flex justify-center">
      <Activity size={48} />
    </div>
    <h2 className="text-xl font-bold mb-2">User Access Level</h2>
    <p className="text-gray-600">
      You are logged in as a standard user. You can view your profile and system announcements. 
      If you need client access, please contact the administrator.
    </p>
    <button className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-lg">View My Profile</button>
  </div>
);

export default UserStats;