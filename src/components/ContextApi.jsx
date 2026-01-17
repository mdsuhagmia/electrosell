import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const ApiData = createContext();

const ContextApi = ({ children }) => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    const res = await axios.get("https://es-back-xv9z.onrender.com/api/products")
    setProducts(res.data.payload.Products || [])
  }


  useEffect(() => {
    setLoading(true)
    Promise.all([
      getProducts(),
    ]).finally(() => setLoading(false))
  }, [])

  return (
    <ApiData.Provider value={{
      products,
      loading,
    }}>
      {children}
    </ApiData.Provider>
  )
}

export { ContextApi }