import React, { useContext, useEffect, useRef, useState } from 'react'
import { apiData } from '../components/ContextApi'
import Container from '../components/Container'
import Post from '../components/Post'
import Pagination from '../components/Pagination'
import { BsGridFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { IoIosCloseCircle } from 'react-icons/io'
import logo from '../assets/logofull.png'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'

const Products = () => {
  let location = useLocation()
  useEffect(()=>{
    if(location.state && location.state.cateData){
      setCateFilShow(location.state.cateData)
      setSelectedCategory(location.state.category)
    }
  },[location.state])

  let data = useContext(apiData)
  
  let [perPage, setPerPage] = useState(12)
  let [currentPage, setCurrentPage] = useState(1)

  let lastPage = perPage * currentPage
  let firstPage = lastPage - perPage
  let allPage = data.slice(firstPage, lastPage)

  let pageNumber = []
  for(let i = 0; i < Math.ceil(data.length / perPage); i++){
    pageNumber.push(i)
  }

  let paginate = (item)=>{
    setCurrentPage(item + 1)
  }

  let next = ()=>{
   if(currentPage < pageNumber.length){
    setCurrentPage((item)=>item + 1)
   }
  }

  let prev = ()=>{
    if(currentPage > 1){
      setCurrentPage((item)=>item - 1)
    }
  }

  let handleChangeValue = (e)=>{
    setPerPage(e.target.value)
    setMpriceOpen(false)
  }

  let handleMatchValue = (e)=>{
    let matchValue = e.target.value
    let sorted = [...data]

    if(matchValue === "low-to-high"){
      sorted.sort((low, high)=> low.price - high.price)
      setCateFilShow(sorted)
      setSelectedCategory([])
      setPriceRange([])
    }else if (matchValue === "high-to-low"){
      sorted.sort((low, high)=> high.price - low.price)
      setCateFilShow(sorted)
      setSelectedCategory([])
      setPriceRange([])
    }else if (matchValue === "a-to-z"){
      sorted.sort((a, b)=> a.title.localeCompare(b.title))
      setCateFilShow(sorted)
      setSelectedCategory([])
      setPriceRange([])
    }else if (matchValue === "best-match"){
      setCateFilShow([])
    }
  }

  let [shopCategory, setShopCategory] = useState([])

  useEffect(()=>{
    setShopCategory([...new Set(data.map((item)=>item.category?.name))])
  },[data])
  
  let [cateFilShow, setCateFilShow] = useState([])
  let [selectedCategory, setSelectedCategory] = useState("");

  let handleShowCate = (citem)=>{
    if(selectedCategory === citem){
      setSelectedCategory('')
      setCateFilShow([])
    }else{
      let cateShow = data.filter((item)=>item.category.name === citem)
      setCateFilShow(cateShow)
      setSelectedCategory(citem)
    }
  }

  let [list, setList] = useState("")
  let handleListView = ()=>{
    setList("active")
  }

  let [low, setLow] = useState([])
  let [high, setHigh] = useState([])
  let [priceRange, setPriceRange] = useState(null)
  let handleChanePrice = (value) => {
    setLow(value.low)
    setHigh(value.high)
    if (priceRange && priceRange.low === value.low && priceRange.high === value.high) {
      setPriceRange(null);
      setCateFilShow([]);
    } else {
      setPriceRange(value);
      let priceShow = data.filter(
        (item) => item.price >= value.low && item.price <= value.high
      );
      setCateFilShow(priceShow);
    }
  };

  // movile responsive logic
  let mcateRef = useRef()
  let mpriceRef = useRef()
  let [mcateOpen, setMcateOpen] = useState(false)
  let [mpriceOpen, setMpriceOpen] = useState(false)
    useEffect(()=>{
      let handleClickOutsite = (e)=>{
        if(mcateOpen && !mcateRef.current.contains(e.target)){
          setMcateOpen(false)
        }
        if(mpriceOpen && !mpriceRef.current.contains(e.target)){
          setMpriceOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutsite)
      return ()=> document.removeEventListener("mousedown", handleClickOutsite)
    },[mcateOpen, mpriceOpen])

  return (
    <>
      <section className='pt-0 pb-12 lg:py-12'>
        <Container>
          <div className='lg:flex justify-between'>
            <div className='w-[20%] hidden lg:block'>
              <h2 className='text-[22px] text-indigo-900 font-semibold font-jose pb-4'>Shop By Category</h2>
              <div className='pb-8'>
                {shopCategory.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${selectedCategory === item ? "border-indigo-600 bg-indigo-50" : "border-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === item}
                      onChange={() => handleShowCate(item)}
                      className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="text-gray-800 font-medium capitalize">{item}</span>
                  </label>
                ))}
              </div>
              <div>
                <h2 className='text-[22px] text-indigo-900 font-semibold font-jose pb-4'>Shop By Price</h2>
                <label
                  className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${priceRange?.low === 0 && priceRange?.high === 99.99
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                    }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleChanePrice({ low: 0, high: 99.99 })}
                    checked={priceRange?.low === 0 && priceRange?.high === 99.99}
                    className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-gray-800 font-medium">$0.00 - $99.99</span>
                </label>

                <label
                  className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${priceRange?.low === 100 && priceRange?.high === 199.99
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                    }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleChanePrice({ low: 100, high: 199.99 })}
                    checked={priceRange?.low === 100 && priceRange?.high === 199.99}
                    className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-gray-800 font-medium">$100.00 - $199.99</span>
                </label>

                <label
                  className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${priceRange?.low === 200 && priceRange?.high === 999.99
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                    }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleChanePrice({ low: 200, high: 999.99 })}
                    checked={priceRange?.low === 200 && priceRange?.high === 999.99}
                    className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-gray-800 font-medium">$200.00 - $999.99</span>
                </label>
              </div>
            </div>
            <div className='lg:hidden flex justify-between items-center py-4'>
              <div>
                <h2 className={`relative text-[16px] sm:text-[18px] text-white font-semibold font-jose py-2 px-4 sm:px-6 rounded-[5px] cursor-pointer ${selectedCategory ? "bg-blue-500" : "bg-black hover:bg-[#000000a7]" } `} onClick={() => setMcateOpen(!mcateOpen)}>Shop By Category</h2>
                <div className={`pb-8 fixed top-0 left-0 bg-white shadow-2xl w-[60%] sm:w-[40%] md:w-[30%] px-2 py-6 z-[99999] h-screen transition-all duration-500 ease-in-out transform ${mcateOpen ? "translate-x-0" : "-translate-x-full"}`} ref={mcateRef}>
                  <div className='flex items-center justify-between pb-6'>
                    <img src={logo} alt="logo" className='w-26 cursor-pointer' />
                    <div onClick={() => setMcateOpen(false)}>
                      {mcateOpen ? <IoIosCloseCircle className='text-3xl text-indigo-700 cursor-pointer hover:scale-110 hover:text-red-500 transition-all duration-500 ease-in-out' /> : ""}
                    </div>
                  </div>
                  {shopCategory.map((item) => (
                    <div>
                      <label
                        key={item}
                        className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${selectedCategory === item ? "border-indigo-600 bg-indigo-50" : "border-gray-300"}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory === item}
                          onChange={() => handleShowCate(item)}
                          onClick={() => setMcateOpen(false)}
                          className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                        />
                        <span className="text-gray-800 font-medium capitalize">{item}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className=''>
                <div onClick={() => setMpriceOpen(!mpriceOpen)} className={`flex items-center gap-x-6 px-4 sm:px-6 py-2 rounded-[5px] text-white cursor-pointer ${priceRange ? "bg-blue-500" : "bg-black hover:bg-[#000000a7]" } `}>
                  <h2 className='text-[16px] sm:text-[18px] font-semibold font-jose'>Filter</h2>
                  <HiOutlineAdjustmentsHorizontal className='text-[22px] sm:text-[25px]' />
                </div>
                <div ref={mpriceRef} className={`pb-8 fixed top-0 right-0 bg-white shadow-2xl w-[60%] sm:w-[40%] md:w-[30%] px-2 py-6 z-[99999] h-screen transition-all duration-500 ease-in-out transform ${mpriceOpen ? "translate-x-0" : "translate-x-full"}`}>
                  <div className='flex items-center justify-between pb-6'>
                    <img src={logo} alt="logo" className='w-26 cursor-pointer' />
                    <div onClick={() => setMpriceOpen(false)}>
                      {mpriceOpen ? <IoIosCloseCircle className='text-3xl text-indigo-700 cursor-pointer hover:scale-110 hover:text-red-500 transition-all duration-500 ease-in-out' /> : ""}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${priceRange?.low === 0 && priceRange?.high === 99.99
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        onClick={() => setMpriceOpen(false)}
                        onChange={() => handleChanePrice({ low: 0, high: 99.99 })}
                        checked={priceRange?.low === 0 && priceRange?.high === 99.99}
                        className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-gray-800 font-medium">$0.00 - $99.99</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${priceRange?.low === 100 && priceRange?.high === 199.99
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        onClick={() => setMpriceOpen(false)}
                        onChange={() => handleChanePrice({ low: 100, high: 199.99 })}
                        checked={priceRange?.low === 100 && priceRange?.high === 199.99}
                        className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-gray-800 font-medium">$100.00 - $199.99</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 cursor-pointer rounded-md border p-2 transition mb-2 ${priceRange?.low === 200 && priceRange?.high === 999.99
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        onClick={() => setMpriceOpen(false)}
                        onChange={() => handleChanePrice({ low: 200, high: 999.99 })}
                        checked={priceRange?.low === 200 && priceRange?.high === 999.99}
                        className="w-4 h-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-gray-800 font-medium">$200.00 - $999.99</span>
                    </label>
                    <div className='sm:hidden'>
                      <div className='flex items-center gap-x-2 mt-6'>
                        <label htmlFor="" className='text-[16px] text-indigo-900 font-medium font-jose'>
                          Show:
                        </label>
                        <select onChange={handleChangeValue} name="" id="" className='px-6 border-2 py-1 border-gray-300 outline-0 rounded-[5px] text-[16px] text-indigo-900 font-medium font-jose'>
                          <option value="12">12</option>
                          <option value="15">15</option>
                          <option value="18">18</option>
                          <option value="21">21</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[78%]'>
              <div className='flex items-center justify-between pb-8'>
                <div>
                  <div className='flex items-center gap-x-4'>
                    <div>
                      <BsGridFill className={`cursor-pointer ${list == "" ? "p-[6px] text-[24px] text-white bg-blue-500 rounded-[5px]" : "p-[6px] text-[24px] text-white bg-blue-200 rounded-[5px]"}`} onClick={() => setList("")} />
                    </div>
                    <div>
                      <FaListUl className={`cursor-pointer ${list == "active" ? "p-[6px] text-[24px] text-white bg-blue-500 rounded-[5px]" : "p-[6px] text-[24px] text-white bg-blue-200 rounded-[5px]"}`} onClick={handleListView} />
                    </div>
                  </div>
                </div>
                <div className=''>
                  <form action="sort" className='flex items-center gap-x-2'>
                    <label htmlFor="sort" className='text-[16px] text-indigo-900 font-medium font-jose'>
                      Sort By:
                    </label>
                    <select onChange={handleMatchValue} name="" id="" className='px-6 border-2 py-1 border-gray-300 outline-0 rounded-[5px] text-[16px] text-indigo-900 font-medium font-jose'>
                      <option value="best-match">Best Match</option>
                      <option value="low-to-high">Low To High</option>
                      <option value="high-to-low">High To Low</option>
                      <option value="a-to-z">A - Z</option>
                    </select>
                  </form>
                </div>
                <div className='hidden sm:block'>
                  <div className='flex items-center gap-x-2'>
                    <label htmlFor="" className='text-[16px] text-indigo-900 font-medium font-jose'>
                      Show:
                    </label>
                    <select onChange={handleChangeValue} name="" id="" className='px-6 border-2 py-1 border-gray-300 outline-0 rounded-[5px] text-[16px] text-indigo-900 font-medium font-jose'>
                      <option value="12">12</option>
                      <option value="15">15</option>
                      <option value="18">18</option>
                      <option value="21">21</option>
                    </select>
                  </div>
                </div>
              </div>
              <Post
                allPage={allPage}
                cateFilShow={cateFilShow}
                list={list}
              />
              <Pagination
                pageNumber={pageNumber}
                paginate={paginate}
                next={next}
                prev={prev}
                currentPage={currentPage}
                cateFilShow={cateFilShow}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Products