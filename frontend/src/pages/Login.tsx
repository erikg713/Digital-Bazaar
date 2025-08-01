import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!window.Pi) {
      alert('Please open this app in the Pi Browser.');
      return;
    }

    try {
      const scopes = ['username', 'payments'];
      const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

      const res = await API.post('/auth/pi-login', {
        pi_uid: user.uid,
        username: user.username,
      });

      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/creator');
    } catch (err) {
      console.error('Pi login failed:', err);
    }
  };

  const onIncompletePaymentFound = (payment: any) => {
    console.warn('Incomplete Pi payment detected:', payment);
  };

  return (
    <div className="p-8 flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold">Pi Item Store Login</h1>
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login with Pi
      </button>
    </div>
  );
}
