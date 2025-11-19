import React, { useState } from 'react'
import Container from '../components/Container'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Login = () => {

  let [showPass, setShowPass] = useState(false);
  let [loginType, setLoginType] = useState("email");

  return (
    <section className='py-12'>
      <Container>
        <div className='max-w-full md:max-w-xl mx-auto bg-violet-950 rounded-2xl shadow-2xl'>
          <form>
            <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-16'>
              <h2 className='text-white font-extrabold text-[18px] sm:text-[30px] pb-6 text-center font-jose'>
                Sign in or create account
              </h2>
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
              <div>
                <label className='text-white text-[16px] sm:text-[18px] font-bold'>
                  Your Password
                </label>
                <div className='relative'>
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder='Enter Your Password'
                    className='py-3 px-4 w-full bg-white rounded-[5px] text-[16px] sm:text-[18px] font-bold outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 mb-4 placeholder:text-[16px]'
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-[5%] top-[50%] -translate-y-[50%] text-gray-600 cursor-pointer text-xl"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className='flex justify-end'>
                <Link to={"/forgotpass"} className='text-[16px] sm:text-[16px] font-bold text-white mb-4 hover:underline'>
                  Forgot password?
                </Link>
              </div>
              <button className='text-[16px] sm:text-[18px] font-bold w-full py-2 bg-fuchsia-600 rounded-[5px] text-white hover:bg-fuchsia-400 transition-all duration-300'>
                Login
              </button>
              <p className='text-[16px] font-bold text-pink-400 pt-8'>
                Don't have an account?
                <Link to={"/signup"} className='hover:underline text-emerald-400 text-[18px]'> Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default Login
