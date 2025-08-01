import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Replace this with Pi SDK integration
    const pi_uid = `pi_${username}_${Date.now()}`; // temp unique ID
    const res = await API.post('/auth/pi-login', { pi_uid, username });
    localStorage.setItem('user', JSON.stringify(res.data));
    navigate('/creator');
  };

  return (
    <div className="p-8 flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold">Pi Item Store Login</h1>
      <input
        type="text"
        className="border p-2 w-64"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login with Pi (Mock)
      </button>
    </div>
  );
}
