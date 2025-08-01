// src/components/PiPayButton.jsx
import React from 'react';
import { loginUser } from '../services/api';

const PiPayButton = ({ onAuth }) => {
  const handleLogin = async () => {
    if (!window.Pi) return alert('Pi SDK not loaded');

    try {
      const scopes = ['username', 'payments'];
      const authResponse = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

      // Send the authenticated Pi user to your backend
      const user = await loginUser(authResponse.user);
      onAuth(user);
    } catch (err) {
      console.error('Pi Auth Error:', err);
    }
  };

  const onIncompletePaymentFound = async (payment) => {
    console.warn('Incomplete payment detected:', payment);
    // optionally notify backend to handle
  };

  return (
    <button onClick={handleLogin} className="bg-yellow-400 text-black px-4 py-2 rounded">
      Sign in with Pi
    </button>
  );
};

export default PiPayButton;
