import React from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivatRouter = ({ children }) => {
    const { session } = UserAuth()
  return (
    <>{session ? <>{children}</> : <Navigate to='/' />}</>
  )
}

export default PrivatRouter