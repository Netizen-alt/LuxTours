'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTour({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          duration: data.duration,
          startDate: new Date(data.startDate).toISOString().split('T')[0],
          image: data.image
        });
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`http://localhost:5000/api/tours/${id}`, {
        method: 'PUT',
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
        alert('Tour updated');
        router.push('/admin/tours');
      } else {
        alert('Failed to update');
      }
    } catch (error) {
      alert('Error updating tour');
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Edit Tour</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea 
            name="description"
             value={formData.description}
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
               value={formData.price}
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
               value={formData.duration}
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
             value={formData.startDate}
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
             value={formData.image || ''}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none"
            placeholder="https://..."
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">
          Save Changes
        </button>
      </form>
    </div>
  );
}
