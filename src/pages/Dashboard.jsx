import DashboardHome from "../components/dashboard/DashboardHome";
import Sidebar from "../components/dashboard/Sitebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <DashboardHome />
      </div>
    </div>
  );
};

export default Dashboard;
