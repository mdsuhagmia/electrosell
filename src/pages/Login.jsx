// import React, { useState } from 'react'
// import Container from '../components/Container'
// import { FaEye, FaEyeSlash, FaPhoneAlt } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { FcGoogle } from 'react-icons/fc'

// const Login = () => {

//   let [showPass, setShowPass] = useState(false);

//   return (
//     <section className='py-6 md:py-8 lg:py-10'>
//       <Container>
//         <div className='max-w-full md:max-w-xl mx-auto bg-violet-950 rounded-2xl shadow-2xl'>
//           <form>
//             <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8'>
//               <h2 className='text-white font-extrabold text-[25px] sm:text-[30px] pb-4 text-center font-jose'>
//                 Log In to Your Account
//               </h2>
//               <div>
//                 <label className='text-white text-[15px] sm:text-[16px] font-bold'>
//                   Your Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   autoComplete='email'
//                   placeholder='Enter Your Email'
//                   className='py-3 px-4 w-full bg-white rounded-[5px] text-[14px] sm:text-[16px] font-bold outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 mb-4 placeholder:text-[14px]'
//                 />
//               </div>
//               <div>
//                 <label className='text-white text-[15px] sm:text-[16px] font-bold'>
//                   Your Password
//                 </label>
//                 <div>
//                   <div className='relative'>
//                     <input
//                       type={showPass ? "text" : "password"}
//                       required
//                       placeholder='Enter Your Password'
//                       className='py-3 px-4 w-full bg-white rounded-[5px] text-[14px] sm:text-[16px] font-bold outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 mb-4 placeholder:text-[14px]'
//                     />
//                     <span
//                       onClick={() => setShowPass(!showPass)}
//                       className="absolute right-[5%] top-[50%] -translate-y-[50%] text-gray-600 cursor-pointer text-xl"
//                     >
//                       {showPass ? <FaEyeSlash /> : <FaEye />}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className='flex justify-end'>
//                 <Link to={"/forgotpass"} className='text-[14px] lg:text-[16px] font-bold text-white mb-4 hover:underline'>
//                   Forgot password?
//                 </Link>
//               </div>
//               <button className='text-[16px] sm:text-[18px] font-bold w-full py-2 bg-fuchsia-600 rounded-[5px] text-white hover:bg-fuchsia-400 transition-all duration-300 cursor-pointer'>
//                 Login
//               </button>
//               <div>
//                 <p className="text-[14px] sm:text-[16px] font-bold font-jose text-white pt-6 text-center">Sign in with</p>
//                 <div className="flex justify-center gap-x-4 items-center pt-4">
//                   <div className="flex items-center justify-center gap-2 px-6 py-2 bg-white rounded-md shadow hover:bg-gray-300 cursor-pointer transition-all">
//                     <FcGoogle className="text-blue-500 text-lg" />
//                     <span className="text-gray-700 font-medium">Google</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2 px-6 py-2 bg-emerald-500 rounded-md shadow hover:bg-emerald-600 cursor-pointer transition-all">
//                     <FaPhoneAlt className="text-white text-lg" />
//                     <span className="text-white font-medium">Phone</span>
//                   </div>
//                 </div>
//               </div>
//               <p className='text-[16px] font-bold text-pink-400 pt-8'>
//                 Don't have an account?
//                 <Link to={"/signup"} className='hover:underline text-emerald-400 text-[18px]'> Sign Up</Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </Container>
//     </section>
//   )
// }

// export default Login


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
      await api.post("/auth/login", { email, password });
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