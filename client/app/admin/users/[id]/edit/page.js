'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditUser({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
       const token = localStorage.getItem('token');
       // In a real app we'd have a specific get user by id endpoint for admin
       // For this demo, we might iterate the list or just assume we have an endpoint
       // My userController has deleteUser and updateUser, but no getUserById for Admin?
       // It has getAllUsers. 
       // I'll add getUserById to userController first? 
       // Or I can just filter from getAllUsers for this demo to save time/complexity if listing is small.
       // But proper way is fetch /api/users, find the user.
       try {
         const res = await fetch('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
         });
         const users = await res.json();
         const user = users.find(u => u.id === id);
         if (user) {
           setEmail(user.email);
           setRole(user.role);
         } else {
           alert('User not found');
           router.push('/admin/users');
         }
       } catch (e) {
         console.error(e);
       } finally {
         setLoading(false);
       }
    };
    fetchUser();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, role })
      });
      if (res.ok) {
        alert('User updated');
        router.push('/admin/users');
      } else {
        alert('Failed to update');
      }
    } catch (err) {
      alert('Error updating user');
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Edit User</h1>
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
          Update User
        </button>
      </form>
    </div>
  );
}
