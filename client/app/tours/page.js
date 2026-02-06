'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tours')
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.error('Failed to fetch tours', err));
  }, []);

  return (
    <div className="min-h-screen p-8 md:p-24 bg-black">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Exclusive Tours
        </h1>
        <p className="text-gray-400 text-lg">Curated experiences just for you.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col group">
            <div 
              className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${tour.image || 'https://via.placeholder.com/400'})` }} 
            />
            <div className="p-6 flex flex-col flex-1 relative bg-black/40 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-2 text-white">{tour.title}</h2>
              <p className="text-gray-400 mb-6 flex-1 text-sm leading-relaxed">
                {tour.description.length > 100
                  ? tour.description.substring(0, 100) + '...'
                  : tour.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-blue-400">${tour.price}</span>
                <Link href={`/tours/${tour.id}`} className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
