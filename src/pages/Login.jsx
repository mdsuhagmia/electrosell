import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  let [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.payload.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-8 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-[5%] top-[50%] -translate-y-[50%] text-gray-600 cursor-pointer text-xl"
          >
            {" "}
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-[16px] font-medium text-pink-400 pt-2">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="hover:underline text-emerald-400 text-[16px]"
          >
            {" "}
            Sign Up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;