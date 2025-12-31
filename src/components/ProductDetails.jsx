// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Container from "./Container";
// import { FaCartPlus } from "react-icons/fa";
// import { CiHeart, CiZoomIn } from "react-icons/ci";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, addToWishlist } from "./slice/productSlice";
// import { toast } from "react-toastify";
// import { RiCloseLargeFill } from "react-icons/ri";

// const ProductDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // ✅ FIX 1: initial state must be null (not [])
//   const [singleProduct, setSingleProduct] = useState(null);
//   const [zoomIn, setZoomIn] = useState(false);

//   // ✅ Fetch product safely
//   useEffect(() => {
//     const getProductById = async () => {
//       try {
//         const response = await axios.get(
//           `https://es-back-xv9z.onrender.com/api/products/${slug}`
//         );
//         setSingleProduct(response.data.payload);
//         console.log(response.data)
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getProductById();
//   }, [slug]);

//   // ✅ Redux
//   const wishlist = useSelector((state) => state.product.wishlistItem);

//   // ✅ Add to cart
//   const handleCart = (item) => {
//     dispatch(addToCart({ ...item, qun: 1 }));
//     toast.success("Add to Cart Successfully");
//     setTimeout(() => navigate("/cart"), 800);
//   };

//   // ✅ Add to wishlist (MongoDB _id fix)
//   const handleWish = (item) => {
//     const alreadyExist = wishlist.find(
//       (wishItem) => wishItem.slug === item.slug
//     );

//     if (alreadyExist) {
//       toast.warning("Already in Wishlist!");
//     } else {
//       dispatch(addToWishlist(item));
//       toast.success("Added to Wishlist Successfully!");
//     }
//   };

//   // ✅ Zoom image
//   const handleZoomIn = (item) => {
//     setZoomIn(item.images?.[0]);
//   };

//   const zoomRef = useRef();
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (zoomIn && zoomRef.current && !zoomRef.current.contains(e.target)) {
//         setZoomIn(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [zoomIn]);

//   // ✅ Loading state
//   if (!singleProduct) {
//     return (
//       <section className="py-20 text-center text-xl font-bold">
//         Loading product...
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gray-50">
//       <Container>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//           {/* Image */}
//           <div>
//             <img
//               src={singleProduct.images?.[0]}
//               alt={singleProduct.title}
//               onClick={() => handleZoomIn(singleProduct)}
//               className="w-full mx-auto bg-gray-300 py-8 px-16 rounded-2xl cursor-zoom-in"
//             />
//           </div>

//           {/* Info */}
//           <div>
//             <h2 className="text-[24px] md:text-[36px] text-indigo-900 font-bold pb-2">
//               {singleProduct.title}
//             </h2>

//             {/* ✅ Category (object safe) */}
//             <p className="text-sm text-gray-600 pb-2">
//               Category:{" "}
//               <span className="font-semibold">
//                 {singleProduct.category?.name}
//               </span>
//             </p>

//             <p className="text-[#d32530] font-bold text-xl pb-4">
//               ${singleProduct.price}
//             </p>

//             <p className="text-[#262626] text-[16px] pb-6">
//               {singleProduct.description}
//             </p>

//             <div className="flex gap-x-4">
//               <button
//                 onClick={() => handleCart(singleProduct)}
//                 className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded text-white"
//               >
//                 Add To Cart <FaCartPlus />
//               </button>

//               <button
//                 onClick={() => handleWish(singleProduct)}
//                 className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded text-white"
//               >
//                 Add To Wishlist <CiHeart className="text-xl" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Zoom Modal */}
//         {zoomIn && (
//           <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
//             <div
//               ref={zoomRef}
//               className="relative bg-white p-6 rounded-xl"
//             >
//               <img
//                 src={zoomIn}
//                 alt=""
//                 className="max-h-[80vh] max-w-[90vw]"
//               />
//               <RiCloseLargeFill
//                 onClick={() => setZoomIn(false)}
//                 className="absolute -top-6 -right-6 text-4xl bg-red-500 text-white p-2 rounded-full cursor-pointer"
//               />
//             </div>
//           </div>
//         )}
//       </Container>
//     </section>
//   );
// };

// export default ProductDetails;













import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from './Container'
import { FaCartPlus, FaHeart, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { CiHeart, CiStar, CiZoomIn } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist } from './slice/productSlice'
import { toast } from 'react-toastify'
import { RiCloseLargeFill } from 'react-icons/ri'

const ProductDetails = () => {
  let {slug} = useParams()

  let [singleProduct, setSingleProduct] = useState([])
  let getProductId = ()=>{
    axios.get(`https://es-back-xv9z.onrender.com/api/products/${slug}`).then((response)=>{
      setSingleProduct(response.data.payload)
      console.log(response.data)
    })
  }
  useEffect(()=>{
    getProductId()
  },[slug])

  let [relatedProducts, setRelatedProducts] = useState([])
  let categoryCus = singleProduct.category?.name
  let getRelatedProducts = ()=>{
    if(categoryCus){
      axios.get(`https://es-back-xv9z.onrender.com/api/products/category/${singleProduct.category}`).then((res)=>{
        let filtered = res.data.payload.filter(item => item.slug !== singleProduct.slug);
        setRelatedProducts(filtered);
      })
    }
  }
  useEffect(()=>{
    getRelatedProducts()
  },[slug])

  // let clientRatting = Array.from({length:5}, (_, index)=>{
  //   let number = index + 0.5
  //   return (
  //     singleProduct?.rating?.rate > index + 1 ? <FaStar className='text-[gold]' /> : singleProduct?.rating?.rate > number ? <FaStarHalfAlt className='text-[gold]' /> : <CiStar /> 
  //   )
  // })

  // let discount = singleProduct.price - 6

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let handleCart = (item)=>{
    dispatch(addToCart({...item, qun: 1}))
    toast.success("Add to Cart Successfully");
    setTimeout(() => {
      navigate("/cart")
    }, 1000);
  }

  let wishlist = useSelector((state)=>state.product.wishlistItem)

  let handleWish = (item) => {
  const alreadyExist = wishlist.find((wishIte) => wishIte.slug === item.slug)

  if (alreadyExist) {
    toast.warning("Already in Wishlist!")
  } else {
    dispatch(addToWishlist(item))
    toast.success("Added to Wishlist Successfully!")
  }
}

  let [zoomIn, setZoomIn] = useState(false)
  const handleZoomIn = (item) => {
  if (item && item.images && item.images.length > 0) {
    setZoomIn(item.images[0]);
  } else {
    toast.error("No image available to zoom!");
  }
};

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
    <section className='py-16 bg-gray-50'>
      <Container>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8'>
            <div className=''>
              <img src={singleProduct.images?.[0]} alt="" className=' w-full mx-auto bg-gray-300 py-8 px-16 rounded-2xl' />
            </div>
            <div className=''>
              <h2 className='text-[20px] sm:text-[36px] md:text-[30px] lg:text-[36px] pt-4 md:pt-0 text-indigo-900 font-bold font-jose pb-2'>{singleProduct.title}</h2>
              <div className='pb-8'>
                {/* <div className='flex gap-4 items-center pb-4'>
                  <div className='flex'>
                    {clientRatting}
                  </div>
                  <div className=''>
                    <p className='text-[#767676] text-[16px]'>{singleProduct?.rating?.count} Review</p>
                  </div>
                </div> */}
                <div className=''>
                  <div className='flex gap-x-6 items-center pb-4'>
                    {/* <p className='text-[#262626] font-jose font-bold text-[18px]'>${discount.toFixed(2)}</p> */}
                    <p className='text-[#d32530] font-bold font-jose line-through'>${singleProduct.price}</p>
                  </div>
                  <p className='text-[#262626] font-dms font-normal text-[16px]'>{singleProduct.description}</p>
                  <div className='flex gap-x-2 sm:gap-x-6 md:gap-x-2 lg:gap-x-6 pt-6'>
                    <div className=''>
                      <div className='flex justify-between items-center cursor-pointer gap-x-4 transition-all duration-300 ease-in-out bg-orange-600 hover:bg-orange-500 px-4 sm:px-6 md:px-4 lg:px-6 py-2 rounded-[5px] text-white'>
                        <p className='text-[14px] sm:text-[16px] font-medium font-josefin' onClick={() => handleCart(singleProduct)}>Add To cart</p>
                        <FaCartPlus className='' />
                      </div>
                    </div>
                    <div className='' onClick={() => handleWish(singleProduct)}>
                      <div className='flex justify-between items-center cursor-pointer gap-x-4 transition-all duration-300 ease-in-out bg-blue-700 hover:bg-blue-800 px-4 sm:px-6 md:px-4 lg:px-6 py-2 rounded-[5px] text-white'>
                        <p className='text-[14px] sm:text-[16px] font-medium font-josefin'>Add To Wishlist</p>
                        <CiHeart className='text-[22px]' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-bold font-jose text-orange-700 pt-12 pb-6'>Related proudcts</h2>
            {relatedProducts.length > 0 ? <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-4'>
              {relatedProducts.map((item) => (
                <div className='mb-4 shadow'>
                  <div className='relative group overflow-x-hidden'>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.images[1]} alt={item.title} className=' bg-gray-300 py-6 object-contain w-full h-52 px-4' />
                    </Link>
                    <div className='absolute top-4 -left-14 group-hover:left-2 opacity-0 group-hover:opacity-100 py-2 transition-all duration-500 ease-in-out'>
                      <div className='pb-4' onClick={() => handleCart(item)}>
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
                    <Link to={`/products/${item.slug}`}>
                      <h2 className='text-[14px] font-bold font-jose text-violet-950 hover:underline line-clamp-2'>{item.title}</h2>
                    </Link>
                    <p className='text-[14px] font-bold font-jose text-violet-950 hover:underline pt-2'>{item.price}</p>
                  </div>
                </div>
              ))}
            </div> : <div><h2 className='text-2xl font-bold font-jose text-pink-500 text-center py-16'>No Related Products</h2></div> }
          </div>
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

export default ProductDetails