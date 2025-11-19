import React from 'react'
import Container from './Container'
import { FaFacebookF, FaFacebookMessenger, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import logofull from '../assets/logofull.png'
import { IoLogoYoutube } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10">
      <Container>
        <div className="md:flex justify-between gap-x-6 lg:gap-x-12 pb-12">
          <div className='w-[100%] md:w-[30%] lg:w-[33%] pb-8 md:pb-0'>
            <img src={logofull} alt="" className="invert brightness-0 w-40 pb-3 cursor-pointer" />
            <p className="text-gray-400 w-[300px] sm:w-[450px] md:max-w-[250px] lg:max-w-[350px] text-[16px] md:text-[14px] lg:text-[16px]">
              We provide exclusive products with premium quality, fast delivery, and guaranteed customer satisfaction.
            </p>
            <div className='flex items-center gap-x-3 lg:gap-x-4 pt-6'>
              <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="bg-[#1877F2] text-[30px] md:text-[28px] lg:text-[36px] text-white p-2 rounded-full hover:scale-125 transition duration-500 ease-in-out " />
                </a>
              </div>
              <div>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <IoLogoYoutube className="bg-[#FF0000] text-white p-2 rounded-full text-[30px] md:text-[28px] lg:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                </a>
              </div>
              <div>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="bg-black text-white p-2 rounded-full text-[30px] md:text-[28px] lg:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                </a>
              </div>
              <div>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white p-2 rounded-full text-[30px] md:text-[28px] lg:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                </a>
              </div>
              <div>
                <a href="https://wa.me/8801762556958" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="bg-[#25D366] text-white p-2 rounded-full text-[30px] md:text-[28px] lg:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                </a>
              </div>
              <div>
                <a href="https://m.me/yourusername" target="_blank" rel="noopener noreferrer">
                  <FaFacebookMessenger className="bg-[#0084FF] text-white p-2 rounded-full text-[30px] md:text-[28px] lg:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                </a>
              </div>
            </div>
          </div>
          <div className='pb-8 md:pb-0'>
            <h3 className="text-white font-semibold mb-3 text-[18px] md:text-[16px] lg:text-[18px]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Home</a></li>
              <li><a href="/products" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Products</a></li>
              <li><a href="/blog" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Blog</a></li>
              <li><a href="/aboutus" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">About Us</a></li>
              <li><a href="/contact" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Contact</a></li>
            </ul>
          </div>
          <div className='pb-8 md:pb-0'>
            <h3 className="text-white font-semibold mb-3 text-[18px] md:text-[16px] lg:text-[18px]">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link to={"/faqs"} className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">FAQs</Link></li>
              <li><Link to={"/myaccount"} className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Your Account</Link></li>
              <li><a href="#" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">Chat With Us</a></li>
            </ul>
          </div>
          <div className=''>
            <h3 className="text-white font-semibold mb-3 text-[18px] md:text-[16px] lg:text-[18px]">Contact Us</h3>
            <p className="text-gray-400 hover:underline hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">
              <a href="tel:+8801731-378743" aria-label="Call Md Shohag Mia">01731-378743</a>
            </p>
            <p className="text-gray-400 hover:underline hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">
              <a href="mailto:mdshohagmia53200@gmail.com" aria-label="Send email to Md Shohag Mia">mdshohagmia53200@gmail.com</a>
            </p>
            <p className="text-gray-400 hover:text-white text-[16px] md:text-[14px] lg:text-[16px]">
              <a
                href="https://www.google.com/maps/place/Jamalpur+Sadar,+Mymensingh,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Jamalpur Sadar, Mymensingh, <br /> Bangladesh
              </a>
            </p>
          </div>
        </div>
        <div className="border-t-2 border-t-gray-700 pt-4 text-center text-gray-200 text-md pb-20 md:pb-4">
          © {new Date().getFullYear()} Electro Selling. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}

export default Footer