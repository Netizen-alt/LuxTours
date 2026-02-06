import Sidebar from '../../components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
}
