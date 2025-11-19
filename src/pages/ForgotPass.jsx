import React, { useState } from 'react';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const ForgotPass = () => {
  let [loginType, setLoginType] = useState("email");
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-full md:max-w-xl mx-auto bg-violet-950 rounded-2xl shadow-2xl">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-16">
            <Link to="/login" className="flex items-center gap-2 text-white text-md text-sm-lg font-jose mb-6 hover:underline">
              <FaArrowLeft /> Back to Login
            </Link>
            <h2 className="text-white font-bold font-lat text-[20px] sm:text-[25px] pb-2 text-center">
              Forgot Your Password?
            </h2>
            <p className="text-gray-300 text-center text-[14px] sm:text-[18px] font-jose mb-8">
              Enter your registered email to receive a password reset link.
            </p>
            <form action="forgot-password">
              <div className='flex items-center text-white w-full pb-8'>
                <div className='w-[50%]'>
                  <p
                    onClick={() => setLoginType("email")}
                    className={`w-full py-2 text-center cursor-pointer text-[16px] sm:text-[18px] font-bold
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
              <button
                className="text-[16px] sm:text-[18px] font-bold font-jose w-full py-2 bg-fuchsia-600 rounded-[5px] text-white cursor-pointer
                hover:bg-fuchsia-400 transition-all duration-300 ease-in-out mt-4"
              >
                Send Reset Link
              </button>
            </form>
            <p className="text-[16px] sm:text-[18px] font-bold font-jose text-center text-pink-400 pt-8">
              <Link to="/login" className="hover:underline text-emerald-400">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ForgotPass;
