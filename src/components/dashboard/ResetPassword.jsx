import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await api.put("/user/reset-password", {
        token,
        password
      });
      Swal.fire({
        icon: "success",
        title: res.data.message,
        text: "আপনার পাসওয়ার্ড সফলভাবে রিসেট হয়েছে। এখন লগইন করুন।",
        timer: 6000,
        showConfirmButton: false,
      });
      navigate("/login")
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white shadow-lg rounded-xl border">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full cursor-pointer p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;