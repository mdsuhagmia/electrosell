import React, { useContext, useEffect, useState } from 'react'
import { apiData } from './ContextApi'
import { Link } from 'react-router-dom'

const BanSlick = () => {
  let data = useContext(apiData)

  let [cateShow, setCateShow] = useState([])
  useEffect(()=>{
    let cateFil = data.filter(item=>item.category === "electronics")
    let exclude = [0, 1, 3, 4, 5];
    let cateSlice = cateFil.filter((_,index)=> !exclude.includes(index))
    setCateShow(cateSlice)
  },[data])
  return (
    <div className='bg-gray-50 shadow border-b-2 border-gray-200'>
      {cateShow.map((item) => (
        <div className='grid grid-cols-2 gap-x-4 py-12 h-90'>
          <div>
            <h2 className='md:text-2xl font-bold font-lat text-red-500 pl-30 pt-2'>New Collection 2025</h2>
            <h2 className='text-2xl font-bold font-lat text-[#06051d] pl-30 pt-3 leading-[32px]'>{item.title}</h2>
            <h2 className='text-md font-semibold font-lat text-[#000] pl-30 pt-2'>Up to <span className='text-2xl text-red-700'> 50% </span>discount</h2>
            <Link to={`/products/${item.id}`} className='text-md font-semibold font-lat text-[#fff] ml-30 mt-4 bg-gray-950 px-8 py-2 rounded-[5px] inline-block hover:bg-gray-600'>
              Shop Now
            </Link>
          </div>
          <div className='px-20'>
            <Link to={`/products/${item.id}`}>
              <img src={item.image} alt={item.title} className='w-full' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BanSlick