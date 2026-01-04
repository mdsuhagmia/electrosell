import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Email</h3>
          <p>{user?.email}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Phone</h3>
          <p>{user?.phone}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Status</h3>
          <p>{user?.isBanned ? "Banned" : "Active"}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
