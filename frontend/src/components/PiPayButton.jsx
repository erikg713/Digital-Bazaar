// src/components/PiPayButton.jsx
import React from 'react';
import { loginUser } from '../services/api';

const PiPayButton = ({ onAuth }) => {
  const handleLogin = async () => {
    if (!window.Pi) return alert('⚠️ Please open this in the Pi Browser.');

    try {
      const scopes = ['username', 'payments'];

      const authResponse = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      const { user, accessToken } = authResponse;

      // POST user and accessToken to backend for verification
      const verifiedUser = await loginUser({
        username: user.username,
        accessToken,
      });

      if (verifiedUser && onAuth) onAuth(verifiedUser);
    } catch (error) {
      console.error('[Pi] Authentication error:', error);
      alert('Pi login failed. Try again in Pi Browser.');
    }
  };

  const onIncompletePaymentFound = async (payment) => {
    console.warn('[Pi] Incomplete payment found:', payment);
    // Optionally notify your backend or retry completion here
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded shadow"
    >
      🔐 Sign in with Pi
    </button>
  );
};

export default PiPayButton;

