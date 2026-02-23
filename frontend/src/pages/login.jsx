import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Logic to redirect based on role
      const user = JSON.parse(localStorage.getItem('user'));
      if(user.role){
      navigate('/dashboard');
      }
    } catch (err) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Portal Login</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Sign In
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
  Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
</p>
      </form>
    </div>
  );
};

export default Login;