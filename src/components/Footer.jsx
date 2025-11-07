import React from 'react'
import Container from './Container'
import { FaFacebookF, FaFacebookMessenger, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import logofull from '../assets/logofull.png'
import { IoLogoYoutube } from 'react-icons/io'
import { FaSquareInstagram } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={logofull} alt="" className="invert brightness-0 w-40 pb-3 cursor-pointer" />
          <p className="text-gray-400">
            We provide exclusive products with premium quality, fast delivery, and guaranteed customer satisfaction.
          </p>
          <div className="flex gap-4 mt-4">
            <a href='#' className="text-white bg-blue-500 hover:bg-blue-600 duration-100 hover:scale-105 transition-all ease-in-out p-2 rounded-full text-[20px]"><FaFacebookF /></a>
            <a href='#' className="text-red-500 bg-white hover:bg-gray-300 duration-100 hover:scale-105 transition-all ease-in-out p-2 rounded-full text-[20px]"><IoLogoYoutube /></a>
            <a href='#' className="text-white bg-[#25D366] hover:bg-[#25d365bf] p-2 rounded-full hover:scale-105 transition-all ease-in-out duration-100 text-[20px]"><FaWhatsapp /></a>
            <a href='#' className="text-[#dc5321] bg-[#ffffff] hover:bg-gray-300 p-2 rounded-full hover:scale-105 transition-all ease-in-out duration-100 text-[20px]"><FaSquareInstagram /></a>
            <a href='#' className="text-[#0084FF] bg-[#ffffff] hover:bg-gray-300 p-2 rounded-full hover:scale-105 transition-all ease-in-out duration-100 text-[20px]"><FaFacebookMessenger /></a>
          </div>
        </div>
        <div className='md:w-30 mx-auto'>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/aboutus" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Your Account</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white">Chat With Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400 hover:underline">
            <a href="tel:+8801731-378743" aria-label="Call Md Shohag Mia">01731-378743</a>
          </p>
          <p className="text-gray-400 hover:underline">
            <a href="mailto:mdshohagmia53200@gmail.com" aria-label="Send email to Md Shohag Mia">mdshohagmia53200@gmail.com</a>
          </p>
            <p className="text-gray-400">
              <a
                href="https://www.google.com/maps/place/Jamalpur+Sadar,+Mymensingh,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Jamalpur Sadar, Mymensingh, Bangladesh
              </a>
            </p>
        </div>
      </div>
        <div className="border-t-2 border-gray-700 mt-8 py-4 text-center text-gray-300 text-md">
          © {new Date().getFullYear()} Electro Selling. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}

export default Footer