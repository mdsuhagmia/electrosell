import React, { useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Settings = () => {

  const [forgotEmail, setForgotEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/forgot-password", {
        email: forgotEmail,
      });
      Swal.fire({
        icon: "success",
        title: res.data.message,
        text: "অনুগ্রহ করে আপনার ইমেইল চেক করুন এবং সেখানে দেওয়া লিংক থেকে পাসওয়ার্ড রিসেট করুন।",
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
      });
      setForgotEmail("");
    } catch (err) {
      toast.error(err);
      toast.error(err.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200">

      <div>
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-3 max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>

      <div className="text-sm text-gray-500 max-w-md mt-2">
        <p>
          For security, your access token expires in 5 minutes. Use the refresh
          token to stay logged in.
        </p>
      </div>
    </div>
  );
};

export default Settings;