'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const links = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Tours', href: '/admin/tours' },
    { name: 'Back to Home', href: '/' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-black border-r border-white/10 p-6 fixed left-0 top-0">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent mb-10">
        LuxAdmin
      </h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`p-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-600/20 text-blue-400 font-semibold' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
