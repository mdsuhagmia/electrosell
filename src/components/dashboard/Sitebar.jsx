import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">User Dashboard</h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/dashboard/profile" className="block hover:text-blue-600">
          Profile
        </Link>
        <Link to="/dashboard/change-password" className="block hover:text-blue-600">
          Change Password
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;