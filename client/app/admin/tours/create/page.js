'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTour() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    startDate: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/tours', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
        })
      });

      if (res.ok) {
        alert('Tour created successfully');
        router.push('/admin/tours');
      } else {
        alert('Failed to create tour');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating tour');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Tour</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Title</label>
          <input 
            type="text" 
            name="title"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea 
            name="description"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none h-32"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
           <div>
            <label className="block text-gray-400 mb-2">Price ($)</label>
            <input 
              type="number" 
              name="price"
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Duration (Days)</label>
            <input 
              type="number" 
              name="duration"
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
        </div>
         <div>
          <label className="block text-gray-400 mb-2">Start Date</label>
          <input 
            type="date" 
            name="startDate"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            required
          />
        </div>
         <div>
          <label className="block text-gray-400 mb-2">Image URL</label>
          <input 
            type="text" 
            name="image"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            placeholder="https://..."
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">
          Create Tour
        </button>
      </form>
    </div>
  );
}
