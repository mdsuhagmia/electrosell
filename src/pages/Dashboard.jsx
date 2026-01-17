import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import Container from "../components/Container";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-xl font-semibold text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section>
      <Container>
        <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/4 bg-white shadow-md min-h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto w-3/4">
        <div className="p-8">
           <Outlet /> 
        </div>
      </div>
    </div>
      </Container>
    </section>
  );
};

export default Dashboard;