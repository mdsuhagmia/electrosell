import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      const userData = res.data.payload?.userWithoutPassword;

      if (userData) {
        setUser(userData);

        Swal.fire({
          icon: "success",
          title: `স্বাগতম, ${userData.name}!`,
          text: "লগইন সফল হয়েছে।",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "লগইন ব্যর্থ",
        text: err.response?.data?.message || "ইমেইল বা পাসওয়ার্ড ভুল।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-md space-y-4 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer text-xl"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex justify-end">
          <Link to={"/forgot-password"} className="text-red-500 font-medium font-jose hover:underline">Forgot password</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded transition font-bold disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center pt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;