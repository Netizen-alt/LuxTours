export default function AdminDashboard() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to the administration panel.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-gray-400 mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-white">1,234</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-gray-400 mb-2">Active Tours</h3>
          <p className="text-4xl font-bold text-white">25</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-gray-400 mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold text-white">$45k</p>
        </div>
      </div>
    </div>
  );
}
