// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const clearMessages = () => {
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      if (isLoginMode) {
        // Login flow
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged in App.jsx will handle user state update and redirect
      } else {
        // Sign Up flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        // onAuthStateChanged in App.jsx will handle user state update and redirect
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    }
  };

  const handlePasswordReset = async () => {
    clearMessages();
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLoginMode ? 'Login to Your Account' : 'Create a New Account'}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLoginMode}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Your full name"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-semibold transition"
        >
          {isLoginMode ? 'Login' : 'Create Account'}
        </button>
      </form>

      {isLoginMode && (
        <div className="mt-4 text-right">
          <button
            onClick={handlePasswordReset}
            className="text-sm text-green-700 hover:underline"
            type="button"
          >
            Forgot password?
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        {isLoginMode ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => {
                clearMessages();
                setIsLoginMode(false);
              }}
              className="text-green-700 font-semibold hover:underline"
              type="button"
            >
              Create account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => {
                clearMessages();
                setIsLoginMode(true);
              }}
              className="text-green-700 font-semibold hover:underline"
              type="button"
            >
              Login here
            </button>
          </>
        )}
      </div>
    </div>
  );
}
