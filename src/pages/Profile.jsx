import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Phone:</b> {user?.phone}</p>
      <p><b>Address:</b> {user?.address}</p>
    </div>
  );
};

export default Profile;