import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Logo from '../Logo';

const NavbarOwner = () => {

    const {user, logout} = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
      <Link to='/owner'>
        <Logo />
      </Link>
      <div className='flex items-center gap-4'>
        <p>Welcome, {user?.name || "Owner"}</p>
        <button onClick={logout} className='px-4 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded text-sm transition-all cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}

export default NavbarOwner
