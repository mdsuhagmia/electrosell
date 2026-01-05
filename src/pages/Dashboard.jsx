import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  const { user, loading } = useAuth();

  // ডাটা ফেচ হওয়া পর্যন্ত ওয়েট করবে
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-xl font-semibold text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  // ইউজার না থাকলে লগইনে ফেরত পাঠাবে
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Section */}
      <div className="w-64 bg-white shadow-md min-h-screen hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
           <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;