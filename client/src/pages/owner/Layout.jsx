import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, user, navigate, token} = useAppContext()

  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
        navigate('/')
    } else if (user !== null && !isOwner) {
        navigate('/')
    }
  },[isOwner, user, navigate])

  if (!token || !user || !isOwner) {
      return null; // or a loading spinner
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarOwner />
      <div className='flex flex-1'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
