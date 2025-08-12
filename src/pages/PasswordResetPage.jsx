import React, { useState } from 'react';

export default function PasswordResetPage({ onResetPassword, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await onResetPassword(email);
      setMessage('If the email is registered, a password reset link has been sent.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800 transition"
        >
          Send Reset Link
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Remembered your password?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-green-700 underline hover:text-green-900"
          type="button"
        >
          Login here
        </button>
      </p>
    </div>
  );
}
