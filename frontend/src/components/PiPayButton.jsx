import React, { useState } from 'react';
import { loginUser } from '../services/api';

export default function PiPayButton({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!window.Pi) return alert('Open in Pi Browser!');

    setLoading(true);
    try {
      const scopes = ['username', 'payments'];
      const authResponse = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      const { user, accessToken } = authResponse;

      const verifiedUser = await loginUser({ username: user.username, accessToken });

      if (verifiedUser) {
        onLoginSuccess(verifiedUser);
      }
    } catch (err) {
      alert('Pi login failed. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.warn('Incomplete Pi payment:', payment);
    // Optionally call backend to resume or cancel
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
    >
      {loading ? 'Signing in...' : 'Sign in with Pi'}
    </button>
  );
}
