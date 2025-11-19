import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartPlus, FaHeart } from 'react-icons/fa'
import { RiCloseLargeFill, RiDeleteBin6Line } from 'react-icons/ri'
import { addToCart, addToWishlist, removeAllWishlist, removeWishlist } from '../components/slice/productSlice'
import { BsFillCartXFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiData } from '../components/ContextApi'
import { CiZoomIn } from 'react-icons/ci'

const WishList = () => {

  let wishData = useSelector((state)=>state.product.wishlistItem)
  let dispatch = useDispatch()

  let handleAllDelete = (item)=>{
    dispatch(removeAllWishlist(item))
  }

  let handleMoveCart = (item)=>{
    dispatch(removeWishlist(item))
    dispatch(addToCart({...item, qun: 1}))
    toast.success("Move to Cart Successfully");
  }

  let data = useContext(apiData)
  let [suggested, setSuggested] = useState([])
  useEffect(()=>{
    let randomProduct = [...data].sort(()=> 0.5 - Math.random())
    let selected = randomProduct.slice(0, 8)
    setSuggested(selected)
  },[data])

  let handleCartItem = (item)=>{
    dispatch(addToCart({...item, qun: 1}))
    toast.success("Add to Cart Successfully");
  }

  let handleWish = (item)=>{
    dispatch(addToWishlist(item))
    toast.success("Add to Wishlist Successfully");
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
    <section className='pb-16'>
      <Container>
        <div className='relative'>
          {wishData.length > 0 && (
            <div className='py-8 sm:py-16 flex items-center justify-start lg:justify-center gap-x-2'>
              <FaHeart className='text-xl sm:text-4xl text-violet-950' />
              <h2 className='text-center text-[20px] sm:text-3xl font-jose font-extrabold text-violet-950'>Your Wishlist ({wishData.length})</h2>
            </div>
          )}
          {wishData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-lg shadow-md hidden md:block">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-indigo-950 font-bold text-lg">
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Delete</th>
                      <th className="px-6 py-4">Move</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishData.map((item, index) => (
                      <tr key={item.id} className="border-t-2 border-[#0000001d] hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
                          <tr>
                            <h2 className="font-semibold font-jose text-indigo-950 max-w-lg">{item.title}</h2>
                            <h3 className="font-medium font-lat text-gray-600">{item.category}</h3>
                          </tr>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">${item.price}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => dispatch(removeWishlist(index))}
                            className="text-red-500 hover:text-red-800 font-semibold cursor-pointer text-xl">
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          <button onClick={() => handleMoveCart(item)} className='text-white bg-blue-500 px-4 py-2 rounded-[5px] cursor-pointer hover:bg-blue-400'>
                            Move to Cart
                          </button>
                        </td>
                        <div className='absolute top-8 sm:top-16 right-0' onClick={() => handleAllDelete(item)}>
                          <h2 className='text-end text-[14px] sm:text-[18px] font-jose font-bold text-white bg-red-500 px-2 sm:px-4 py-1 sm:py-2 rounded-[5px] inline-block cursor-pointer hover:bg-red-400'>Delete All</h2>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto rounded-lg shadow-md md:hidden">
                <table className="min-w-full bg-white border-t-3 border-blue-500">
                  <tbody>
                    {wishData.map((item, index) => (
                      <tr key={item.id} className="border-t-2 border-[#0000001d] hover:bg-gray-50 transition">
                        <td className="px-2 py-4 flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
                          <tr>
                            <h2 className="font-semibold font-jose text-indigo-950 max-w-lg">{item.title}</h2>
                            <h3 className="font-medium font-lat text-gray-600">{item.category}</h3>
                          </tr>
                        </td>
                        <tr className='flex items-center justify-between pb-4 px-2'>
                          <div className="text-gray-700 font-semibold">${item.price}</div>
                          <div className="">
                            <button
                              onClick={() => dispatch(removeWishlist(index))}
                              className="text-red-500 hover:text-red-800 font-semibold cursor-pointer text-xl">
                              <RiDeleteBin6Line />
                            </button>
                          </div>
                          <div className="font-semibold text-gray-800">
                            <button onClick={() => handleMoveCart(item)} className='text-white bg-blue-500 px-4 py-2 rounded-[5px] cursor-pointer hover:bg-blue-400'>
                              Move to Cart
                            </button>
                          </div>
                        </tr>
                        <div className='absolute top-8 sm:top-16 right-0' onClick={() => handleAllDelete(item)}>
                          <h2 className='text-end text-[14px] sm:text-[18px] font-jose font-bold text-white bg-red-500 px-2 sm:px-4 py-1 sm:py-2 rounded-[5px] inline-block cursor-pointer hover:bg-red-400'>Delete All</h2>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center py-12">
                <div className="flex items-center justify-center gap-2 pb-6">
                  <h2 className="text-2xl sm:text-4xl font-bold font-jose text-indigo-950">Your WishList is Empty</h2>
                  <BsFillCartXFill className="text-2xl sm:text-3xl text-indigo-950" />
                </div>
                <Link
                  to="/products"
                  className="bg-indigo-950 text-white px-8 py-3 rounded font-semibold hover:bg-indigo-800 text-md transition">
                  Continue Shopping
                </Link>
              </div>
              <div>
                <h2 className='text-green-500 text-[25px] font-semibold font-jose pb-2'>Just for you</h2>
              </div>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4'>
                {suggested.map((item)=>(
                  <div className='mb-4 shadow'>
                    <div className='relative group overflow-x-hidden'>
                      <Link to={`/products/${item.id}`}>
                        <img src={item.image} alt={item.title} className=' bg-gray-300 py-6 object-contain w-full h-40 sm:h-60 px-4 md:px-14' />
                      </Link>
                      <div className='absolute top-4 -left-14 group-hover:left-2 opacity-0 group-hover:opacity-100 py-2 transition-all duration-500 ease-in-out'>
                        <div className='pb-4' onClick={() => handleCartItem(item)}>
                          <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#ee00ff] pl-1'>
                            <FaCartPlus />
                          </div>
                        </div>
                        <div className='pb-4'>
                          <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#ee00ff] pl-1'>
                            <FaHeart onClick={() => handleWish(item)} />
                          </div>
                        </div>
                        <div className='pb-4'>
                          <div onClick={() => handleZoomIn(item)} className='cursor-pointer text-[#767676] text-[16px] font-dms font-medium hover:text-[#ee00ff]'>
                            <CiZoomIn className='text-3xl' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='py-4 px-3'>
                      <Link to={`/products/${item.id}`}>
                        <h2 className='text-[14px] font-bold font-jose text-violet-950 hover:underline line-clamp-2'>{item.title}</h2>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
      </Container>
    </section>
  )
}

export default WishList