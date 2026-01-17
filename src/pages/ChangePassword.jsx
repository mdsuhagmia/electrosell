import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/user/update-password/${user._id}`, {
      email: user.email,
      ...form,
    });
    toast.success("Password updated successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        className="input"
        onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
      />

      <input
        type="password"
        placeholder="New Password"
        className="input"
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="input"
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
        Update Password
      </button>
    </form>
  );
};

export default ChangePassword;