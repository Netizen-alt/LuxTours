'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ToursManagement() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tours')
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this tour?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/tours/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTours(tours.filter(t => t.id !== id));
        alert('Tour deleted successfully');
      } else {
        alert('Failed to delete tour');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting tour');
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Tour Management</h1>
        <Link href="/admin/tours/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
          Add New Tour
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${tour.image})` }} />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{tour.title}</h3>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>${tour.price}</span>
                <span>{tour.duration} Days</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/tours/${tour.id}/edit`} className="flex-1 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-center">Edit</Link>
                <button 
                  onClick={() => handleDelete(tour.id)}
                  className="flex-1 py-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
