import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import { Link, NavLink } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { CiMenuFries, CiUser } from 'react-icons/ci'
import { GrClose } from 'react-icons/gr'
import logofull from '../assets/logofull.png'
// import { useAuth } from '../authContext/AuthContext'
import { MdDashboard } from 'react-icons/md'

const Header = () => {

  // let {user} = useAuth()

  let menuRef = useRef()
  let [openMenu, setOpenMenu] = useState(false)

  useEffect(()=>{
    let handleClickOutsite = (e)=>{
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setOpenMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutsite)
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutsite)
    }
  },[openMenu])

  return (
    <header className='bg-gray-100 py-2 relative hidden md:block'>
      <Container>
        <div className='flex items-center justify-between'>
          <div>
            <Link to={"/"}>
              <img src={logofull} alt="" className='h-8 lg:h-12' />
            </Link>
          </div>
          <div ref={menuRef}>
            <ul className={`md:flex items-center gap-x-4 lg:gap-x-6 md:static transition-all ease-in-out duration-700 ${openMenu == true ? "absolute top-0 left-0 bg-white shadow border-b-2 border-[#0000002d] py-4 w-full z-[9999] pl-4" : "absolute top-0 -left-200"}`}>
            <div className='md:hidden flex justify-end pr-4' onClick={()=>setOpenMenu((prev)=>!prev)}>
              {openMenu == true ? <GrClose className='text-2xl cursor-pointer' /> : "" }
            </div>
              <li className='pb-2 md:pb-0'>
                <NavLink to={"/"} className={({isActive})=> `text-[14px] font-jose font-semibold hover:text-violet-600 ${isActive ? "text-red-500" : "text-violet-950" }`}>
                  Home
                </NavLink>
              </li>
              <li className='pb-2 md:pb-0'>
                <NavLink to={"/products"} className={({isActive})=> `text-[14px] font-jose font-semibold hover:text-violet-600 ${isActive ? "text-red-500" : "text-violet-950" }`}>
                  Products
                </NavLink>
              </li>
              <li className='pb-2 md:pb-0'>
                <NavLink to={"/categories"} className={({isActive})=> `text-[14px] font-jose font-semibold hover:text-violet-600 ${isActive ? "text-red-500" : "text-violet-950" }`}>
                  Categories
                </NavLink>
              </li>
              <li className='pb-2 md:pb-0'>
                <NavLink to={"/blog"} className={({isActive})=> `text-[14px] font-jose font-semibold hover:text-violet-600 ${isActive ? "text-red-500" : "text-violet-950" }`}>
                  Blog
                </NavLink>
              </li>
              <li className='pb-2 md:pb-0'>
                <NavLink to={"/aboutus"} className={({isActive})=> `text-[14px] font-jose font-semibold hover:text-violet-600 ${isActive ? "text-red-500" : "text-violet-950" }`}>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='flex items-center gap-x-3 lg:gap-x-6'>
            <div>
              <NavLink to={"/wishlist"} className={({isActive})=> `text-[14px] font-jose font-semibold hover:text-violet-600 flex items-center gap-x-2 group border-l border-l-[#00000045] ${isActive ? "text-red-500" : "text-violet-950" }`}>
                <FiHeart className='text-[17px] group-hover:text-violet-600 ml-4' />
                <p className='text-[14px] font-semibold font-jose group-hover:text-violet-600'>Wishlist</p>
              </NavLink>
            </div>
            <div>
              <NavLink to={"/dashboard"} className={({ isActive }) => `text-[14px] font-jose font-semibold hover:text-violet-600 flex items-center gap-x-2 group border-l border-l-[#00000045] ${isActive ? "text-red-500" : "text-violet-950"}`}>
                <MdDashboard className='text-[18px] group-hover:text-violet-600 ml-2' />
                <p className='text-[14px] font-semibold font-jose group-hover:text-violet-600'>Dashboard</p>
              </NavLink>
            </div>
            {/* <div>
              <NavLink to={"/login"} className={({ isActive }) => `text-[14px] font-jose font-semibold hover:text-violet-600 flex items-center gap-x-2 group border-l border-l-[#00000045] ${isActive ? "text-red-500" : "text-violet-950"}`}>
                <CiUser className='text-[18px] group-hover:text-violet-600 ml-2' />
                <p className='text-[14px] font-semibold font-jose group-hover:text-violet-600'>Login / SignUp</p>
              </NavLink>
            </div> */}
          </div>
          <div className='md:hidden' onClick={()=>setOpenMenu((prev)=>!prev)}>
            {openMenu == true ? <GrClose className='text-2xl cursor-pointer opacity-0' /> : <CiMenuFries className='text-2xl cursor-pointer' />}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header