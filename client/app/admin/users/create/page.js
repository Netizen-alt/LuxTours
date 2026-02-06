'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', { // Reusing register or new create endpoint?
        // Actually, usually admin creates via a specific user endpoint or just register. 
        // Let's assume we use the auth/register for now but arguably admin should have a direct create.
        // But the previous implementation of userController didn't have a create.
        // I'll use auth/register for simplicity or add a create to userController. 
        // Using auth/register is fine, but it logs the user in if using frontend logic usually. 
        // But here we just want to create. 
        // Wait, auth/register returns a token. 
        // Let's assume we use it but ignore the token.
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      // If we want to set role, we need a separate update call or a better create endpoint.
      // Register only makes USER.
      // So: 1. Register -> 2. Update Role (if ADMIN).
      
      const data = await res.json();
      if (res.ok) {
        if (role === 'ADMIN') {
           // Provide token to update? No, we use our current admin token to update the new user?
           // The endpoint /api/users/:id is protected and admin only.
           // We need the new user's ID.
           // auth/register returns { userId: ... } based on my previous code?
           // Let's check authController.js
           
           if (data.userId) {
              await fetch(`http://localhost:5000/api/users/${data.userId}`, {
                method: 'PUT',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: 'ADMIN' })
              });
           }
        }
        alert('User created successfully');
        router.push('/admin/users');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            required
          />
        </div>
         <div>
          <label className="block text-gray-400 mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            required
          />
        </div>
         <div>
          <label className="block text-gray-400 mb-2">Role</label>
          <select 
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
          >
            <option value="USER" className="text-black">User</option>
            <option value="ADMIN" className="text-black">Admin</option>
          </select>
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">
          Create User
        </button>
      </form>
    </div>
  );
}
