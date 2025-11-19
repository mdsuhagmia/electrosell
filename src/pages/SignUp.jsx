import React, { useState } from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  let [showConfirmPass, setShowConfirmPass] = useState(false);

  let [showPass, setShowPass] = useState(false);
  let [loginType, setLoginType] = useState("email");

  return (
    <section className="py-12">
      <Container>
        <form action="signup">
          <div className="max-w-full md:max-w-xl mx-auto bg-violet-950 rounded-2xl shadow-2xl">
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-16">
              <h2 className="text-white font-bold font-lat text-[25px] pb-6 text-center">
                Create Your Account
              </h2>
              <div className='flex items-center text-white w-full pb-8'>
                <div className='w-[50%]'>
                  <p
                    onClick={() => setLoginType("email")}
                    className={`w-full py-2 text-center text-[16px] sm:text-[18px] cursor-pointer  font-bold
                      ${loginType === "email" ? "bg-cyan-500" : "bg-cyan-800"}
                    `}
                  >
                    Email
                  </p>
                </div>
                <div className='w-[50%]'>
                  <p
                    onClick={() => setLoginType("phone")}
                    className={`w-full py-2 text-center cursor-pointer text-[16px] sm:text-[18px] font-bold
                      ${loginType === "phone" ? "bg-cyan-500" : "bg-cyan-800"}
                    `}
                  >
                    Phone
                  </p>
                </div>

              </div>
              <div>
                <label className="text-white text-[16px] sm:text-[18px] font-bold font-jose">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Your Full Name"
                  className="py-3 px-4 w-full bg-white rounded-[5px] text-[16px] sm:text-[18px] font-bold font-jose 
                outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 
                focus:ring-blue-500 mb-4 placeholder:text-[16px] placeholder:font-bold placeholder:font-jose mt-2"
                />
              </div>
              {loginType === "email" && (
                <div>
                  <label className='text-white text-[16px] sm:text-[18px] font-bold'>
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete='email'
                    placeholder='Enter Your Email'
                    className='py-3 px-4 w-full bg-white rounded-[5px] text-[16px] sm:text-[18px] font-bold outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 mb-4 placeholder:text-[16px]'
                  />
                </div>
              )}
              {loginType === "phone" && (
                <div>
                  <label className='text-white text-[16px] sm:text-[18px] font-bold'>
                    Your Phone Number
                  </label>
                  <input
                    type="number"
                    required
                    autoComplete='tel'
                    placeholder='Enter Your Phone Number'
                    className='py-3 px-4 w-full bg-white rounded-[5px] text-[16px] sm:text-[18px] font-bold outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 mb-4 placeholder:text-[16px]'
                  />
                </div>
              )}
              <div>
                <label className="text-white text-[16px] sm:text-[18px] font-bold font-jose">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="Enter Your Password"
                    className="py-3 px-4 w-full bg-white rounded-[5px] text-[16px] sm:text-[18px] font-bold font-jose 
                  outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 
                  focus:ring-blue-500 mb-4 placeholder:text-[16px] placeholder:font-bold placeholder:font-jose mt-2"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-[5%] top-[50%] -translate-y-[50%] text-gray-600 cursor-pointer text-xl"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="pb-6">
                <label className="text-white text-[16px] sm:text-[18px] font-bold font-jose">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    placeholder="Confirm Your Password"
                    className="py-3 px-4 w-full bg-white rounded-[5px] text-[16px] sm:text-[18px] font-bold font-jose 
                  outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 
                  focus:ring-blue-500 mb-4 placeholder:text-[16px] placeholder:font-bold placeholder:font-jose mt-2"
                  />
                  <span
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-[5%] top-[50%] -translate-y-[50%] text-gray-600 cursor-pointer text-xl"
                  >
                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button className="text-[16px] sm:text-[18px] font-bold font-jose w-full py-2 bg-fuchsia-600 rounded-[5px] text-white cursor-pointer hover:bg-fuchsia-400 transition-all duration-300 ease-in-out">
                Create Account
              </button>
              <p className="text-[16px] sm:text-[18px] font-bold font-jose text-pink-400 pt-8 text-center">
                Already have an account? {""} 
                <Link to="/login" className="hover:underline text-emerald-400 text-[20px]">
                   Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default SignUp;
