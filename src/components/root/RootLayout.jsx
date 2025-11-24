import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Menu from '../Menu'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import MobileFixMenu from '../MobileFixMenu'
import MobileMenu from '../MobileMenu'
import ScrollToTop from '../ScrollToTop'

const RootLayout = () => {
  
  let [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let handleScroll = () => {
      let scroll = window.scrollY
      if (scroll > 130) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    document.addEventListener("scroll", handleScroll)
    return ()=> document.removeEventListener("scroll", handleScroll)

  }, [scrolled])

  let handleScrollTop = ()=>{
    window.scroll({top: 0, behavior: 'smooth'})
  }
  return (
    <div>
      <ScrollToTop/>
      <Header />
      <Menu />
      <MobileMenu/>
      <Outlet />
      <Footer />
      <MobileFixMenu/>
      {scrolled && (
        <div className='fixed right-1 bottom-20 md:bottom-4'>
          <a href="tel:+8801762556958" target='_blank'><FaPhone className='text-[28px] md:text-[34px] bg-blue-600 text-white p-2 rounded-full hover:scale-110 hover:bg-blue-500 cursor-pointer mb-2' /></a>
          <a href="https://wa.me/8801762556958" target='_blank'><FaWhatsapp className='text-[28px] md:text-[34px] bg-[#25D366] text-white p-2 rounded-full hover:scale-110 hover:bg-[#25d365d5] cursor-pointer mb-2' /></a>
          <MdOutlineDoubleArrow onClick={handleScrollTop} className='-rotate-90 text-[28px] md:text-[34px] bg-blue-600 text-white p-2 rounded-full hover:scale-110 hover:bg-blue-500 cursor-pointer' />
        </div>
      )}
    </div>
  )
}

export default RootLayout