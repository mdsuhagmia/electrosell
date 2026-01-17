import React, { useEffect, useRef, useState } from 'react'
import { FaCartPlus, FaHeart } from 'react-icons/fa'
import { MdAutorenew } from 'react-icons/md'
// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { addToCartThunk } from './slice/productSlice'
import { CiZoomIn } from 'react-icons/ci'
import { RiCloseLargeFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { addToCart, addToWishlist } from './slice/productSlice'
import toast from 'react-hot-toast'
// import toast from 'react-hot-toast'
// import { useAuth } from '../context/AuthContext'
// import api from '../api/axios'

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

  // let {user} = useAuth();
  // const navigate = useNavigate();
  
  // const handleAddToCart = async (item)=>{
  //   if (!user) {
  //     toast.error("Please login first!");
  //     navigate("/login");
  //     return;
  //   }
  //   try {
  //     const response = await api.post("/cart/add", {
  //     userId: user._id,
  //     productId: item._id
  //     })
  //     if (response.status === 200 || response.status === 201) {
  //     toast.success("Product added to cart!");
  //     }
  //   } catch (error) {
  //     toast.error("Faild add to cart.")
  //     console.error(error)
  //   }
  // }

  // const dispatch = useDispatch();

//   const handleCart = (product) => {
//   if (!user) {
//     toast.error("Please login first");
//     return;
//   }

//   // এই অবজেক্টটি productData হিসেবে যাবে
//   const cartData = {
//     userId: user._id,       // লগইন করা ইউজারের আইডি
//     productId: product._id, // প্রোডাক্টের আইডি
//     qun: 1                  // প্রাথমিক কোয়ান্টিটি
//   };

//   dispatch(addToCartThunk(cartData))
//     .unwrap()
//     .then(() => toast.success("Added to cart"))
//     .catch((err) => toast.error(err.message));
// };

//   let wishlist = useSelector((state)=>state.product.wishlistItem)

//   let handleWish = (item) => {
//   const alreadyExist = wishlist.find((wishIte) => wishIte.id === item.id)

//   if (alreadyExist) {
//     toast.error("Already in Wishlist!")
//   } else {
//     dispatch(addToWishlist(item))
//     toast.success("Added to Wishlist Successfully!")
//   }
// }

  let [zoomIn, setZoomIn] = useState(false)
  let handleZoomIn = (item) => {
    setZoomIn(item.images[0])
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

  const dispatch = useDispatch();
  const {user} = useAuth();
  
  const handleCartAdd = (item) => {
    if (user && user._id) {
      const cartData = {
        userId: user._id,
        productId: item._id,
        qun: 1,
      };
      dispatch(addToCart(cartData))
        .unwrap()
        .then(() => toast.success("Product added to cart successfully!"))
        .catch((err) => toast.error("Failed to add: " + err.message));
    } else {
      toast.error("Please login first!");
    }
  };

  const handleWishlist = (item)=>{
    if (user && user._id) {
      const wishData = {
        userId: user._id,
        productId: item._id
      };
      dispatch(addToWishlist(wishData))
        .unwrap()
        .then(() => toast.success("Add to Wishlist Successfully"))
        .catch((err) => toast.error("Failed to add: " + err.message));
    } else {
      toast.error("Please login first!");
    }
  }

  return (
    <div>
      {catefilterSl.length > 0 ? <div className={`${list == "active" ? "grid grid-cols-1" : "grid grid-cols-2 md:grid-cols-3 gap-x-3"}`}>
        {catefilterSl.map((item) => (
          <div key={item.id} className="bg-white rounded-[8px] shadow-xl mb-6">
            <div className='relative group'>
              <Link to={`/products/${item.slug}`}>
                <img src={item.images[0]} alt={item.title}
                  className="w-full h-70 object-contain bg-gra-100 bg-gray-300 rounded-t-[5px]" />
              </Link>
              <div className='absolute bottom-0 left-2 opacity-0 group-hover:opacity-100 py-2'>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626]'>
                    <FaCartPlus onClick={()=>handleCartAdd(item)} />
                  </div>
                </div>
                <div className='pb-4'>
                  <div onClick={()=>handleWishlist(item)} className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626]'>
                    <FaHeart  />
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
              <div className='flex items-center gap-x-4'>
                <p className="mt-1 text-lg font-bold">ট-{item.discountPrice}</p>
                <p className="mt-1 text-lg font-bold text-red-500 line-through">ট-{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div> : <div className={`${list == "active" ? "grid grid-cols-1" : "grid grid-cols-2 md:grid-cols-3 gap-x-3"}`}>
        {allPage.map((item) => (
          <div key={item.id} className="bg-white rounded-[8px] shadow-xl mb-6">
            <div className='relative group overflow-hidden'>
              <Link to={`/products/${item.slug}`}>
                <img src={item.images[0]} alt={item.title}
                  className="w-full h-70 object-contain bg-gra-100 bg-gray-300 rounded-t-[5px]" />
              </Link>
              <div className='absolute bottom-0 -left-14 group-hover:left-2 opacity-0 group-hover:opacity-100 py-2 transition-all duration-500 ease-in-out'>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626] pl-1'>
                    <FaCartPlus onClick={()=>handleCartAdd(item)} />
                  </div>
                </div>
                <div className='pb-4'>
                  <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#262626] pl-1'>
                    <FaHeart onClick={()=>handleWishlist(item)}  />
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
              <div className='flex items-center gap-x-4'>
                <p className="mt-1 text-lg font-bold">ট-{item.discountPrice}</p>
                <p className="mt-1 text-lg font-bold text-red-500 line-through">ট-{item.price}</p>
              </div>
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