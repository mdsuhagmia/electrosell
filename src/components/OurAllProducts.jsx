import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from './Container'
import Slider from 'react-slick';
import { apiData } from './ContextApi';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { CiZoomIn } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist } from './slice/productSlice';
import { RiCloseLargeFill } from 'react-icons/ri';
import toast from 'react-hot-toast';

const OurAllProducts = () => {

  let data = useContext(apiData)

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className='absolute top-[50%] translate-y-[-50%] left-4'
        onClick={onClick}
      >
        <MdArrowBackIosNew className='bg-blue-500 text-white text-4xl p-1 rounded-full cursor-pointer hover:bg-blue-400' />
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] translate-y-[-50%] z-[99] right-4"
        onClick={onClick}
      >
        <MdArrowForwardIos className='bg-blue-500 text-white text-4xl p-1 rounded-full cursor-pointer hover:bg-blue-400' />
      </div>
    );
  }
  
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

    let dispatch = useDispatch()
    let handleCartItem = (item)=>{
      dispatch(addToCart({...item, qun: 1}))
      toast.success("Add to Cart Successfully");
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
    let handleZoomIn = (item)=>{
      setZoomIn(item.image)
    }

    let zoomRef = useRef()
    useEffect(()=>{
      let handleClickOutsite = (e)=>{
        if(zoomIn && !zoomRef.current.contains(e.target)){
          setZoomIn(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutsite)
      return ()=> document.removeEventListener("mousedown", handleClickOutsite)
    },[zoomIn])

  return (
    <section className='py-12'>
      <Container>
        <div>
          <h2 className='text-4xl text-gray-950 font-bold font-lat text-center pb-6'>Our All Products</h2>
          <Slider {...settings} className='ourall_pro'>
            {data.map((item)=>(
              <div className='px-2'>
                <div key={item.id} className="bg-white rounded-[8px] shadow-xl mb-6 min-h-[320px]">
                  <div className='relative group overflow-hidden'>
                    <Link to={"/products"} className=''>
                      <img src={item.images[2]} alt={item.title}
                        className="w-full h-52 object-contain px-6 py-4 bg-gra-100 bg-gray-300 rounded-t-[5px]" />
                    </Link>
                    <div className='absolute top-4 -left-14 group-hover:left-2 opacity-0 group-hover:opacity-100 py-2 transition-all duration-500 ease-in-out'>
                      <div className='pb-4' onClick={()=>handleCartItem(item)}>
                        <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#ee00ff] pl-1'>
                          <FaCartPlus />
                        </div>
                      </div>
                      <div className='pb-4'>
                        <div className='cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#ee00ff] pl-1'>
                          <FaHeart onClick={()=>handleWish(item)} />
                        </div>
                      </div>
                      <div className='pb-4'>
                        <div onClick={()=>handleZoomIn(item)} className='cursor-pointer text-[#767676] text-[16px] font-dms font-medium hover:text-[#ee00ff]'>
                          <CiZoomIn className='text-3xl' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-b-lg text-gray-950">
                    <Link to={"/products"}>
                      <h3 className="text-sm font-semibold line-clamp-2 hover:underline">{item.title}</h3>
                    </Link>
                    <p className="mt-1 text-lg text-red-500 font-bold">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
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

export default OurAllProducts