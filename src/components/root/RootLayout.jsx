import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Menu from '../Menu'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import MobileFixMenu from '../MobileFixMenu'
import MobileMenu from '../MobileMenu'

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
      <Header />
      <Menu />
      <MobileMenu/>
      <Outlet />
      <Footer />
      <MobileFixMenu/>
      {scrolled && (
        <div className='fixed right-1 bottom-4'>
          <FaPhone className='text-[34px] bg-blue-600 text-white p-2 rounded-full hover:scale-110 hover:bg-blue-500 cursor-pointer mb-2' />
          <FaWhatsapp className='text-[34px] bg-[#25D366] text-white p-2 rounded-full hover:scale-110 hover:bg-[#25d365d5] cursor-pointer mb-2' />
          <MdOutlineDoubleArrow onClick={handleScrollTop} className='-rotate-90 text-[34px] bg-blue-600 text-white p-2 rounded-full hover:scale-110 hover:bg-blue-500 cursor-pointer' />
        </div>
      )}
    </div>
  )
}

export default RootLayout