import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from './Container'
import { apiData } from './ContextApi'
import logofull from '../assets/logofull.png'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logofull.png'
import { IoIosCloseCircle, IoLogoYoutube } from 'react-icons/io'
import { FaCartPlus, FaFacebookF, FaFacebookMessenger, FaInstagram, FaPhone, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoMenu } from 'react-icons/io5'
import { ReactTyped } from 'react-typed'
import { useSelector } from 'react-redux'

const MobileMenu = () => {

  let data = useContext(apiData)
    let [categoryShow, setCategoryShow] = useState([])
  
    useEffect(()=>{
      setCategoryShow([...new Set(data.map((item)=>item.category))])
    },[data])
  
    let navigate = useNavigate()
    let handleCate = (citem)=>{
      let cateFill = data.filter((item)=>item.category === citem)
      navigate('/products', { state: { cateData: cateFill, category: citem } })
      setLeftMenu(false)
    }
  
    let [search, setSearch] = useState("")
    let [searchFilter, setSearchFilter] = useState([])
    let handleSearchValue = (e)=>{
      setSearch(e.target.value)
      if(e.target.value == ""){
        setSearchFilter([])
      }else{
        let searchFil = data.filter((item)=>item.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchFilter(searchFil)
      }
    }
  
    //! search btn click logic
    let handleSearchClick = () => {
      if (searchFilter.length > 0) {
        navigate('/products', { state: { cateData: searchFilter, category: 'Search Results' } });
        setSearchFilter([]);
        setSearch("");
      }
    };
  
    let searchRef = useRef()
    useEffect(()=>{
      let handleClickOutsite = (e)=>{
        console.log(e.target.value)
        if(searchRef.current && !searchRef.current.contains(e.target)){
          setSearchFilter([])
          setSearch("")
        }
      }
      document.addEventListener("mousedown", handleClickOutsite)
      return ()=>{
        document.removeEventListener("mousedown", handleClickOutsite)
      }
    },[])
  
    let handleSearchShow = (item)=>{
      navigate(`/products/${item.id}`)
      setSearchFilter([])
      setSearch("")
    }
  
    let [activeIndex, setActiveIndex] = useState(-1)
    let handkeKeyDown = (e)=>{
      if(e.key === "ArrowDown"){
        e.preventDefault();
        setActiveIndex(prev =>
          prev < searchFilter.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev =>
          prev > 0 ? prev - 1 : - 1
        );
      }
      if (e.key === "Enter") {
        if (activeIndex !== -1) {
          handleSearchShow(searchFilter[activeIndex]);
        }
      }
    }
  
    let itemRefs = useRef([]);
    useEffect(() => {
      if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
        itemRefs.current[activeIndex].scrollIntoView({
          block: "nearest",
        });
      }
    }, [activeIndex]);
  
  
    let [isSticky, setIsSticky] = useState(false)
    useEffect(()=>{
      let handleScroll = ()=>{
        let scrolled = window.scrollY
        if(scrolled > 130){
          setIsSticky(true)
        }else{
          setIsSticky(false)
        }
      }
      document.addEventListener("scroll", handleScroll)
      return ()=> document.removeEventListener("scroll", handleScroll)
    },[])
  
    let [leftMenu, setLeftMenu] = useState(false)
    let handleLeftMenu = ()=>{
      setLeftMenu(!leftMenu)
    }
    let leftMenuRef = useRef()
    useEffect(()=>{
      let handleClickOutsite = (e)=>{
        if(leftMenu && !leftMenuRef.current.contains(e.target)){
          setLeftMenu(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutsite)
      return ()=> document.removeEventListener("mousedown", handleClickOutsite)
    },[leftMenu])

  let rdata = useSelector((state) => state.product.cartItem)
  let totalQuantity = rdata.reduce((total, index) => total + index.qun, 0)

  let [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories([...new Set(data.map((item) => item.category))])
  }, [data])

  return (
    <nav className={`py-3 shadow md:hidden ${isSticky == true ? "fixed top-0 w-full bg-violet-950 z-[9999] left-0" : "bg-indigo-950"}`}>
      <Container>
        <div className=''>
          <div className="flex items-center justify-between relative">
            <div className=''>
              <div className='flex items-center gap-x-2 text-white'>
                <IoMenu onClick={handleLeftMenu} className='text-[30px] sm:text-[50px] cursor-pointer hover:scale-105 hover:text-gray-200 hover:duration-300' />
                <img src={logofull} alt="" className='h-8 sm:h-11 invert brightness-0 cursor-pointer' />
              </div>
            </div>
            <div className='mr-2'>
              <div className='relative'>
                <Link to={"/cart"}>
                  <FaCartPlus className='text-2xl sm:text-3xl text-white hover:text-gray-300' />
                  <div className='absolute -top-2 -right-3'>
                    <h4 className={`${totalQuantity < 1 ? "text-red-500 bg-gray-100 shadow h-5 w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-sm sm:text-md" : "text-indigo-950 bg-gray-100 h-4 sm:h-5 w-4 sm:w-5 flex leading-5 justify-center rounded-full font-lat font-bold text-sm sm:text-md"}`}>{totalQuantity}</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[100%] relative mt-2" ref={searchRef}>
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
                  className={`w-full py-1 sm:py-2 pl-6 pr-36 bg-gray-50 outline-2 outline-indigo-900 focus:outline-blue-600 ${searchFilter.length > 0 ? "rounded-t-xl focus:outline-0" : "rounded-xl"}`}
                  placeholder="Search In Electro Selling"
                />
              </ReactTyped>
              <div onClick={searchFilter.length > 0 ? handleSearchClick : undefined} className={`w-[20%] absolute top-0 right-0 bg-gray-300 flex items-center justify-center h-full ${searchFilter.length > 0 ? "rounded-tr-xl cursor-pointer hover:bg-gray-400" : "rounded-r-xl cursor-not-allowed"}`}>
                <p className='text-center text-black text-[15px] sm:text-[18px] font-bold font-jose'>Search</p>
              </div>
            </div>
            {searchFilter.length > 0 && (
              <div className='absolute top-[30px] sm:top-[40px] left-0 bg-white shadow w-full z-[99999] max-h-96 overflow-y-scroll rounded-b-xl' onWheel={(e) => {
                e.stopPropagation();
              }}>
                {searchFilter.map((item, index) => (
                  <div ref={el => itemRefs.current[index] = el} className={`flex items-center justify-between py-2 sm:py-6 cursor-pointer ${activeIndex === index ? "bg-gray-200" : (activeIndex !== -1 ? "" : "hover:bg-gray-200")}`} onClick={() => handleSearchShow(item)}>
                    <h2 className='pl-4 text-[10px] sm:text-[16px]'>{item.title}</h2>
                    <img src={item.image} alt="" className='h-8 w-8 mr-4' />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={`absolute top-0 right-0 bg-[#000000a0] capitalize z-[99999] w-full h-screen overflow-y-scroll transition-opacity duration-500 ${leftMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div ref={leftMenuRef} className={`bg-white shadow pb-2 capitalize z-[99999] w-[80%] sm:w-[70%] md:w-[60%] lg:w-[33%] h-screen pl-4 md:pl-6 lg:pl-8 xl:pl-10 2xl:pl-12 pr-4 overflow-y-scroll transition-transform duration-700 ease-in-out transform ${leftMenu ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='flex items-center justify-between pt-6'>
              <img src={logo} alt="logo" className='w-26 cursor-pointer' />
              <div onClick={() => setLeftMenu(false)}>
                {leftMenu ? <IoIosCloseCircle className='text-3xl text-indigo-700 cursor-pointer hover:scale-110 hover:text-red-500 transition-all duration-500 ease-in-out' /> : ""}
              </div>
            </div>
            <ul className='pt-8'>
              {categoryShow.map((item) => (
                <li onClick={() => handleCate(item)} className='text-indigo-950 py-2 hover:text-indigo-500 hover:px-6 transition-all ease-in-out duration-300 cursor-pointer text-[18px] font-bold font-lat border-b border-b-[#00000043]'>{item}</li>
              ))}
            </ul>
            <div className='py-8'>
              <h2 className='text-red-800 font-bold font-jose text-[25px] pb-4'>Contact me</h2>
              <div className='pb-2'>
                <a href="tel:+8801762556958" className='flex items-center gap-x-2 hover:underline'>
                  <FaPhone className='text-emerald-500 text-[18px]' />
                  <p className='text-indigo-950 text-[16px] font-semibold font-lat'>+8801762556958</p>
                </a>
              </div>
              <div className='pb-2'>
                <a href="mailto:electroselling25@gmail.com" className='flex items-center gap-x-2 hover:underline'>
                  <MdEmail className='text-[#007AFF] text-[20px]' />
                  <p className='text-indigo-950 text-[16px] font-semibold font-lat'>electroselling25@gmail.com</p>
                </a>
              </div>
            </div>
            <div className='pb-12'>
              <h2 className='text-red-800 font-bold font-jose text-[25px] pb-4'>Stay Connected</h2>
              <div className='flex items-center gap-x-3 sm:gap-x-4'>
                <div>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="bg-[#1877F2] text-[30px] sm:text-[36px] text-white p-2 rounded-full hover:scale-125 transition duration-500 ease-in-out " />
                  </a>
                </div>
                <div>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <IoLogoYoutube className="bg-[#FF0000] text-white p-2 rounded-full text-[30px] sm:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                  </a>
                </div>
                <div>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="bg-black text-white p-2 rounded-full text-[30px] sm:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                  </a>
                </div>
                <div>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white p-2 rounded-full text-[30px] sm:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                  </a>
                </div>
                <div>
                  <a href="https://wa.me/8801762556958" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="bg-[#25D366] text-white p-2 rounded-full text-[30px] sm:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                  </a>
                </div>
                <div>
                  <a href="https://m.me/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaFacebookMessenger className="bg-[#0084FF] text-white p-2 rounded-full text-[30px] sm:text-[36px] hover:scale-125 transition duration-500 ease-in-out" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default MobileMenu