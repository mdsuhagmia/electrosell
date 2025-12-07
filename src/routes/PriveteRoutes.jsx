import React from 'react'
import { useAuth } from '../authContext/AuthContext'
import { Navigate } from 'react-router-dom'

const PriveteRoutes = ({children}) => {
  let {user} = useAuth()

  return user ? children : <Navigate to={"/login"} />

}

export default PriveteRoutes