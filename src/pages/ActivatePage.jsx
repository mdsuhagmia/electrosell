import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const ActivatePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    setLoading(true);
    try {
      await api.post("/user/activate", { token });

      toast.success("Account activated successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Activation failed or token expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Activate Your Account
        </h2>
        <p className="text-gray-600 mb-6">
          Click the button below to complete your registration and activate your
          account.
        </p>
        <button
          onClick={handleActivate}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition duration-200 ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Activating..." : "Activate Account"}
        </button>
      </div>
    </div>
  );
};

export default ActivatePage;