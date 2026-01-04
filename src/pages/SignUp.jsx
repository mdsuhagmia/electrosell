import { useState } from "react";
import api from "../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const data = new FormData();
  //     Object.keys(formData).forEach((key) => {
  //       if (formData[key] !== null) {
  //         data.append(key, formData[key]);
  //       }
  //     });

  //     // Axios call
  //     const res = await api.post("/user/process-register", data, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       withCredentials: true, // cookies support if needed
  //     });

  //     setMessage(res.data.message || "Registration successful! Check your email for verification.");
  //   } catch (err) {
  //     console.error("Signup error:", err.response || err);
  //     setMessage(err.response?.data?.message || "Registration failed. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]); // must match backend field names
      }
    });

    const res = await api.post("/user/process-register", data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    });

    setMessage(res.data.message); // show backend message
  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="py-8 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-md space-y-4 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {message && (
          <p className={`text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <input
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          className="input"
          required
        />
        <div className="relative">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            onChange={handleChange}
            placeholder="Password"
            className="input"
            required
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer text-lg"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <input
          name="phone"
          onChange={handleChange}
          placeholder="Phone"
          className="input"
          required
        />
        <input
          name="address"
          onChange={handleChange}
          placeholder="Address"
          className="input"
          required
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border cursor-pointer py-2 px-3 rounded w-full bg-blue-50"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-500 transition"
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>

        <p className="text-sm text-center pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
