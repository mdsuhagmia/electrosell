import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import { apiData } from '../components/ContextApi'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  let data = useContext(apiData)
  let [category, setCategory] = useState([])
  useEffect(()=>{
    setCategory([...new Set(data.map((item)=>item.category))])
  },[data])

  let navigate = useNavigate()
  let handleCate = (citem)=>{
    let cateFill = data.filter((item)=>item.category === citem)
    navigate('/products', { state: { cateData: cateFill, category: citem } })
  }
  return (
    <section className='py-12'>
      <Container>
        <div className='grid grid-cols-4 text-center gap-x-4'>
          {category.map((item)=>(
            <h2 onClick={()=>handleCate(item)} className='capitalize text-violet-950 font-bold font-jose text-2xl hover:bg-gray-400 cursor-pointer hover:text-violet-700 transition-all duration-500 ease-in-out bg-gray-300 py-2 rounded-[5px]'>{item}</h2>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Categories