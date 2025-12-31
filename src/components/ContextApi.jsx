import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

let apiData = createContext()
const ContextApi = ({children}) => {

  let [info, setInfo] = useState([])
  let getData = ()=>{
    axios.get("https://es-back-xv9z.onrender.com/api/products").then((response)=>{
      setInfo(response.data.payload.Products)
    })
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      <apiData.Provider value={info}>{children}</apiData.Provider>
    </div>
  )
}

export {ContextApi, apiData}