import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus, FaRegHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { IoMenu } from 'react-icons/io5'
import logofull from '../assets/logofull.png'
import { apiData } from './ContextApi'
import { ReactTyped } from 'react-typed'

const ScrolldMenu = ({searchRef, handleSearchValue, handkeKeyDown, searchFilter, activeIndex, itemRefs, handleSearchShow, handleLeftMenu, handleSearchClick}) => {

  let rdata = useSelector((state)=>state.product.cartItem)
  let totalQuantity = rdata.reduce((total, index)=>total + index.qun, 0)
  let wdata = useSelector((state)=>state.product.wishlistItem)

  let data = useContext(apiData)
  let [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories([...new Set(data.map((item) => item.category.name))])
  }, [data])

  return (
    <div className=''>
      <div className="flex items-center justify-between relative">
        <div className=''>
          <div className='flex items-center gap-x-2 text-white'>
            <IoMenu onClick={handleLeftMenu} className='text-[50px] cursor-pointer hover:scale-105 hover:text-gray-200 hover:duration-300' />
            <img src={logofull} alt="" className='h-11 invert brightness-0 cursor-pointer' />
          </div>
        </div>
        <div className="w-[60%] relative" ref={searchRef}>
          <div className="relative w-full">
            <ReactTyped
              strings={categories.map(cat => `Search for ${cat}`)}
              typeSpeed={40}
              backSpeed={70}
              attr="placeholder"
              loop
              className='text-indigo-900'
            >
              <input
                type="search"
                onChange={handleSearchValue}
                onKeyDown={handkeKeyDown}
                className={`w-full py-2 pl-6 pr-36 bg-gray-50 outline-2 outline-indigo-900 focus:outline-blue-600 ${searchFilter.length > 0 ? "rounded-t-xl focus:outline-0" : "rounded-xl"}`}
                placeholder="Search In Electro Selling"
              />
            </ReactTyped>
            <div onClick={searchFilter.length > 0 ? handleSearchClick : undefined} className={`w-[20%] absolute top-0 right-0 bg-gray-300 flex items-center justify-center h-full ${searchFilter.length > 0 ? "rounded-tr-xl cursor-pointer hover:bg-gray-400" : "rounded-r-xl cursor-not-allowed"}`}>
              <p className='text-center text-black text-[18px] font-bold font-jose'>Search</p>
            </div>
          </div>
          {searchFilter.length > 0 && (
            <div className='absolute top-[40px] left-0 bg-white shadow w-full z-[99999] max-h-96 overflow-y-scroll rounded-b-xl' onWheel={(e) => {
              e.stopPropagation();
            }}>
              {searchFilter.map((item, index) => (
                <div ref={el => itemRefs.current[index] = el} className={`flex items-center justify-between py-6 cursor-pointer ${activeIndex === index ? "bg-gray-200" : (activeIndex !== -1 ? "" : "hover:bg-gray-200")}`} onClick={() => handleSearchShow(item)}>
                  <h2 className='pl-4'>{item.title}</h2>
                  <img src={item.images?.[0]} alt="" className='h-8 w-8 mr-4' />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex items-center gap-x-8'>
          <div>
            <div className='relative'>
              <Link to={"/wishlist"}>
                <FaRegHeart className='text-3xl text-white hover:text-gray-300' />
                <div className='absolute -top-2 -right-3'>
                  <h4 className={`${wdata.length < 1 ? "text-red-500 bg-gray-100 shadow h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-md" : "text-indigo-950 bg-gray-100 h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-md"}`}>{wdata.length}</h4>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <div className='relative'>
              <Link to={"/cart"}>
                <FaCartPlus className='text-3xl text-white hover:text-gray-300' />
                <div className='absolute -top-2 -right-3'>
                  <h4 className={`${totalQuantity < 1 ? "text-red-500 bg-gray-100 shadow h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-md" : "text-indigo-950 bg-gray-100 h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-md"}`}>{totalQuantity}</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrolldMenu