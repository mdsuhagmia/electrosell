import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axios";

const ActivatePage = () => {
  const { token } = useParams(); // /activate/:token route থেকে token নেবে
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const activateAccount = async () => {
      try {
        const res = await api.post("/user/activate", { token });
        toast.success(res.data.message);
        setLoading(false);
        setTimeout(() => {
          navigate("/login"); // success হলে login page এ নিয়ে যাবে
        }, 3000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Activation failed");
        setLoading(false);
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center py-12 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        {loading ? (
          <h2 className="text-xl font-bold">Activating your account...</h2>
        ) : (
          <h2 className="text-xl font-bold">
            {token ? "Activation complete! Redirecting..." : "Invalid token"}
          </h2>
        )}
      </div>
    </div>
  );
};

export default ActivatePage;