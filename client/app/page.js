import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black">
      <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent pb-2">
        Discover the <br /> Extraordinary
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">
        Premium tours for the discerning traveler. Experience the world like never before with LuxTours.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/tours" 
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Explore Now
        </Link>
        <Link 
          href="/register" 
          className="px-8 py-4 border border-white/20 hover:bg-white/5 font-bold rounded-full hover:scale-105 transition-transform backdrop-blur-sm"
        >
          Join Us
        </Link>
      </div>
    </main>
  )
}
