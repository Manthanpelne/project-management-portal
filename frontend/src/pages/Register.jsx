import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              name="name" type="text" required 
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              name="email" type="email" required 
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              name="password" type="password" required 
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assign Role</label>
            <select 
              name="role" 
              className="w-full mt-1 p-2 border border-gray-300 rounded bg-white outline-none"
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;