'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration Successful');
        window.location.href = '/login';
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black p-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8 text-center">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Email</label>
            <input
              type="email"
              className="p-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-sm text-gray-400 font-medium">Password</label>
            <input
              type="password"
              className="p-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="p-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-xl hover:from-purple-500 hover:to-purple-400 transition-all shadow-lg hover:shadow-purple-500/20 mt-2"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-8 relative z-10">
          Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 ml-1 font-medium">Log In</Link>
        </p>
      </div>
    </div>
  );
}
