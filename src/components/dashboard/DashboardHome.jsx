import { useAuth } from "../../context/AuthContext";
import { CheckCircle, CircleCheckBig, Mail, PhoneCall } from 'lucide-react';

const DashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center text-blue-500">
        Welcome, {user?.name} 👋
      </h1>

      <div className="flex items-center justify-between gap-4">
        <div className="bg-white p-4 rounded shadow w-full">
          <div className="flex items-center gap-x-2 pb-2">
            <Mail />
            <h3 className="font-semibold">Email</h3>
          </div>
          <p>{user?.email}</p>
        </div>

        <div className="bg-white p-4 rounded shadow w-full">
          <div className="flex items-center gap-x-2 pb-2">
            <PhoneCall />
            <h3 className="font-semibold">Phone</h3>
          </div>
          <p>{user?.phone}</p>
        </div>

        <div className="bg-white p-4 rounded shadow w-full">
          <div className="flex items-center gap-x-2 pb-2">
            <CircleCheckBig />
            <h3 className="font-semibold">Status</h3>
          </div>
          <p>{user?.isBanned ? "Banned" : "Active"}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
