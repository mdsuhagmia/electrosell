import React, { useEffect, useRef, useState } from 'react'
import { FaCartPlus, FaHeart } from 'react-icons/fa'
import { MdAutorenew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, addToWishlist } from './slice/productSlice'
import { CiZoomIn } from 'react-icons/ci'
import { RiCloseLargeFill } from 'react-icons/ri'
import toast from 'react-hot-toast'

const Post = ({ allPage, cateFilShow, list }) => {

  let [catefilterSl, setCateFilterSl] = useState([])
  useEffect(() => {
    let cateAll = cateFilShow.slice(0, 12)
    setCateFilterSl(cateAll)
  }, [cateFilShow])

  let [showAll, setShowAll] = useState([true])
  let handleShowAll = () => {
    setCateFilterSl(cateFilShow)
    setShowAll(false)
  }

  let handleShowLess = () => {
    let cateall = cateFilShow.slice(0, 12)
    setCateFilterSl(cateall)
    setShowAll(true)
  }

  let user = useSelector((state)=>state.product.user)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let handleCart = (item)=>{
    if(!user){
      navigate("/login")
    }else{
      dispatch(addToCart({...item, qun: 1}))
      toast.success("Add to Cart Successfully")
    }
  }

  let wishlist = useSelector((state)=>state.product.wishlistItem)

  let handleWish = (item) => {
  const alreadyExist = wishlist.find((wishIte) => wishIte.id === item.id)

  if (alreadyExist) {
    toast.error("Already in Wishlist!")
  } else {
    dispatch(addToWishlist(item))
    toast.success("Added to Wishlist Successfully!")
  }
}

  let [zoomIn, setZoomIn] = useState(false)
  let handleZoomIn = (item) => {
    setZoomIn(item.image)
  }

  let zoomRef = useRef()
  useEffect(() => {
    let handleClickOutsite = (e) => {
      if (zoomIn && !zoomRef.current.contains(e.target)) {
        setZoomIn(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutsite)
    return () => document.removeEventListener("mousedown", handleClickOutsite)
  }, [zoomIn])

  return (
    <div>
      {catefilterSl.length > 0 ? <div className={`${list == "active" ? "grid grid-cols-1" : "grid grid-cols-2 md:grid-cols-3 gap-x-3"}`}>
        {catefilterSl.map((item) => (
          <div key={item.id} className="bg-white rounded-[8px] shadow-xl mb-6">
            <div className='relative group'>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt={item.title}
                  className="w-full h-52 object-contain px-8 py-4 bg-gra-100 bg-gray-300 rounded-t-[5px]" />
              </Link>
              <div className='absolute bottom-0 left-2 opacity-0 group-hover:opacity-100 py-2'>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626]'>
                    <FaCartPlus onClick={()=>handleCart(item)} />
                  </div>
                </div>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626]'>
                    <FaHeart onClick={()=>handleWish(item)} />
                  </div>
                </div>
                <div className='pb-4'>
                  <div onClick={() => handleZoomIn(item)} className='cursor-pointer text-[#767676] text-[16px] font-dms font-medium hover:text-[#ee00ff]'>
                    <CiZoomIn className='text-3xl' />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-b-lg text-gray-950">
              <Link>
                <h3 className="text-sm font-semibold line-clamp-2 hover:underline">{item.title}</h3>
              </Link>
              <p className="mt-1 text-lg font-bold">${item.price}</p>
            </div>
          </div>
        ))}
      </div> : <div className={`${list == "active" ? "grid grid-cols-1" : "grid grid-cols-2 md:grid-cols-3 gap-x-3"}`}>
        {allPage.map((item) => (
          <div key={item.id} className="bg-white rounded-[8px] shadow-xl mb-6">
            <div className='relative group overflow-hidden'>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt={item.title}
                  className="w-full h-52 object-contain px-8 py-4 bg-gra-100 bg-gray-300 rounded-t-[5px]" />
              </Link>
              <div className='absolute bottom-0 -left-14 group-hover:left-2 opacity-0 group-hover:opacity-100 py-2 transition-all duration-500 ease-in-out'>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626] pl-1'>
                    <FaCartPlus onClick={()=>handleCart(item)} />
                  </div>
                </div>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626] pl-1'>
                    <FaHeart onClick={()=>handleWish(item)} />
                  </div>
                </div>
                <div className='pb-4'>
                  <div onClick={() => handleZoomIn(item)} className='cursor-pointer text-[#767676] text-[16px] font-dms font-medium hover:text-[#ee00ff]'>
                    <CiZoomIn className='text-3xl' />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-b-lg text-gray-950">
              <Link>
                <h3 className="text-sm font-semibold line-clamp-2 hover:underline">{item.title}</h3>
              </Link>
              <p className="mt-1 text-lg font-bold">${item.price}</p>
            </div>
          </div>
        ))}
      </div>}

      {cateFilShow.length > 12 && showAll ? <h2 className="px-4 py-2 cursor-pointer text-blue-500 text-lg bg-gray-50 border-2 border-[#0000001e] rounded-md hover:bg-blue-100 inline select-none" onClick={handleShowAll} >
        Show More
      </h2> : cateFilShow.length > 12 && <h2 className="px-4 py-2 cursor-pointer text-blue-500 text-lg bg-gray-50 border-2 border-[#0000001e] rounded-md hover:bg-blue-100 inline select-none" onClick={handleShowLess}>
        Show Less </h2>}

      {zoomIn && (
        <div ref={zoomRef} className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-gray-100 px-20 rounded-2xl shadow-2xl border border-[#0000004b]'>
          <div className='relative'>
            <img src={zoomIn} className='max-w-7xl max-h-[calc(100vh-60px)] py-6' alt="" />
            <div className='absolute top-4 -right-16'>
              <RiCloseLargeFill
                onClick={() => setZoomIn(false)}
                className='text-5xl bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 duration-300 font-extrabold'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post