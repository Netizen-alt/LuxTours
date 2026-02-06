'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function TourDetail({ params }) {
  const [tour, setTour] = useState(null);
  const { id } = use(params);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a tour.');
      window.location.href = '/login';
      return;
    }
    alert(`Booking request sent for ${tour.title}!`);
  };

  if (!tour) return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen p-8 md:p-24 bg-black flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 group">
          <img 
            src={tour.image || 'https://via.placeholder.com/1000x500'} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt={tour.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
            <div>
               <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{tour.title}</h1>
               <div className="flex gap-6 text-gray-300 text-lg">
                <span className="bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">{tour.duration} Days</span>
                <span className="bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">{new Date(tour.startDate).toLocaleDateString()}</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-white">About this tour</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{tour.description}</p>
             </div>
             <Link href="/tours" className="inline-block text-gray-400 hover:text-white underline decoration-blue-500 underline-offset-4 transition-colors">
               ← Back to Tours
             </Link>
          </div>
          
          <aside className="h-fit space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm sticky top-24">
              <div className="flex justify-between items-end mb-6">
                <div>
                   <p className="text-sm text-gray-400 uppercase tracking-widest">Price per person</p>
                   <div className="text-4xl font-bold text-blue-400">${tour.price}</div>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-400">
                <li className="flex items-center gap-2">✓ 5-Star Accommodation</li>
                <li className="flex items-center gap-2">✓ Professional Guide</li>
                <li className="flex items-center gap-2">✓ All Entrance Fees</li>
              </ul>
              <button 
                onClick={handleBooking} 
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-white/20"
              >
                Book Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
