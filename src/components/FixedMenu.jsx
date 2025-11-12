import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'
import { HiOutlineBars3CenterLeft } from 'react-icons/hi2'
import { useSelector } from 'react-redux'
import { apiData } from './ContextApi'
import { ReactTyped } from 'react-typed'

const FixedMenu = ({categoryShow, searchRef, handleSearchValue, handkeKeyDown, searchFilter, activeIndex, itemRefs, handleCate, handleSearchShow, handleSearchClick}) => {

  let rdata = useSelector((state)=>state.product.cartItem)
  let data = useContext(apiData)
  let [categories, setCategories] = useState([])
  
    useEffect(()=>{
      setCategories([...new Set(data.map((item)=>item.category))])
    },[data])

  return (
    <div className=''>
      <div className="flex items-center justify-between">
        <div className='relative group'>
          <div className='flex items-center gap-x-2 text-white cursor-pointer group'>
            <HiOutlineBars3CenterLeft className='text-[25px] group-hover:text-gray-200' />
            <h2 className="text-[16px] font-jose font-bold text-white group-hover:text-gray-200">Shop by Category</h2>
            <IoIosArrowDown className='group-hover:rotate-180 transition-all ease-in-out duration-200 text-2xl group-hover:text-gray-200' />
          </div>
          <div className='absolute top-6 left-0 bg-indigo-950 pt-4 pb-2 capitalize z-[99999] w-full opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all ease-in-out duration-300'>
            <ul>
              {categoryShow.map((item) => (
                <li onClick={() => handleCate(item)} className='text-white py-2 hover:bg-indigo-900 px-2 hover:px-6 transition-all ease-in-out duration-300 cursor-pointer text-[14px] font-bold font-lat'>{item}</li>
              ))}
            </ul>
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
                placeholder=""
              />
            </ReactTyped>
            <div onClick={searchFilter.length > 0 ? handleSearchClick : undefined} onKeyDown={handkeKeyDown} className={`w-[20%] absolute top-0 right-0 bg-gray-300 flex items-center justify-center h-full ${searchFilter.length > 0 ? "rounded-tr-xl cursor-pointer hover:bg-gray-400" : "rounded-r-xl cursor-not-allowed"}`}>
              <p className='text-center text-black text-[18px] font-bold font-jose'>Search</p>
            </div>
          </div>
          {searchFilter.length > 0 && (
            <div className='absolute top-[40px] left-0 bg-white shadow w-full z-[99999] max-h-96 overflow-y-scroll rounded-b-xl' onWheel={(e) => {
              e.stopPropagation();
            }}>
              {searchFilter.map((item, index) => (
                <div ref={el => itemRefs.current[index] = el} className={`flex items-center justify-between py-6 cursor-pointer ${activeIndex == index ? "bg-gray-200" : (activeIndex !== -1 ? "" : "hover:bg-gray-200")}`} onClick={() => handleSearchShow(item)}>
                  <h2 className='pl-4'>{item.title}</h2>
                  <img src={item.image} alt="" className='h-8 w-8 mr-4' />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className='relative'>
            <Link to={"/cart"}>
              <FaCartPlus className='text-4xl text-white hover:text-gray-200' />
              <div className='absolute -top-2 -right-3'>
                <h4 className={`${rdata.length < 1 ? "text-red-500 bg-gray-100 shadow h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-md" : "text-indigo-950 bg-gray-100 h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-md"}`}>{rdata.length}</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FixedMenu