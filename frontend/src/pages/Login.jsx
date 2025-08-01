import React, { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    if (window.Pi) {
      window.Pi.authenticate(['username'], function (auth) {
        console.log('Pi User:', auth.user);
        localStorage.setItem('piUser', JSON.stringify(auth.user));
        window.location.href = '/dashboard';
      });
    } else {
      alert('Pi SDK not available. Please open in Pi Browser.');
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg text-gray-700">Authenticating with Pi Network...</p>
    </div>
  );
}
