import React, { useState } from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  let [showPass, setShowPass] = useState(false);

  return (
    <section className="py-6 md:py-8 lg:py-10">
      <Container>
        <form action="signup">
          <div className="max-w-full md:max-w-xl mx-auto bg-violet-950 rounded-2xl shadow-2xl">
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
              <h2 className="text-white font-bold font-lat text-[25px] sm:text-[30px] pb-4  text-center">
                Create Your Account
              </h2>
              <div>
                <label className="text-white text-[15px] sm:text-[16px] font-bold font-jose">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Your Full Name"
                  className="py-3 px-4 w-full bg-white rounded-[5px] text-[14px] sm:text-[16px] font-bold font-jose 
                outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 
                focus:ring-blue-500 mb-4 placeholder:text-[14px] placeholder:font-bold placeholder:font-jose mt-2"
                />
              </div>
              <div>
                <label className='text-white text-[15px] sm:text-[16px] font-bold'>
                  Your Email
                </label>
                <input
                  type="email"
                  autoComplete='email'
                  placeholder='Enter Your Email'
                  className='py-3 px-4 w-full bg-white rounded-[5px] text-[14px] sm:text-[16px] font-bold outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 mb-4 placeholder:text-[14px]'
                />
              </div>
              <div className="pb-4">
                <label className="text-white text-[15px] sm:text-[16px] font-bold font-jose">
                  Password
                </label>
                <div >
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      placeholder="Enter Your Password"
                      className="py-3 px-4 w-full bg-white rounded-[5px] text-[14px] sm:text-[16px] font-bold font-jose 
                  outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 
                  focus:ring-blue-500 mb-4 placeholder:text-[14px] placeholder:font-bold placeholder:font-jose mt-2"
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-[5%] top-[50%] -translate-y-[50%] text-gray-600 cursor-pointer text-xl"
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-[14px] sm:text-[16px] font-bold font-jose w-full py-2 bg-fuchsia-600 rounded-[5px] text-white cursor-pointer hover:bg-fuchsia-400 transition-all duration-300 ease-in-out">
                Create Account
              </button>
              <div>
                <p className="text-[14px] sm:text-[16px] font-bold font-jose text-white pt-6 text-center">Sign up with</p>
                <div className="flex justify-center gap-x-4 items-center pt-4">
                  <div className="flex items-center justify-center gap-2 px-6 py-2 bg-white rounded-md shadow hover:bg-gray-300 cursor-pointer transition-all">
                    <FcGoogle className="text-blue-500 text-lg" />
                    <span className="text-gray-700 font-medium">Google</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 px-6 py-2 bg-emerald-500 rounded-md shadow hover:bg-emerald-600 cursor-pointer transition-all">
                    <FaPhoneAlt className="text-white text-lg" />
                    <span className="text-white font-medium">Phone</span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] sm:text-[16px] font-bold font-jose text-pink-400 pt-6 text-center">
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
