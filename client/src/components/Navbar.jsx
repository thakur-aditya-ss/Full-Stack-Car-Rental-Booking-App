import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async ()=>{
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <motion.div 
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-700 font-medium border-b border-borderColor/50 sticky top-0 z-50 transition-all ${location.pathname === "/" ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white/90 backdrop-blur-md shadow-sm"}`}>

        <Link to='/'>
            <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className="h-8"/>
        </Link>

        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor/50 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-6 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-white/95 backdrop-blur-xl" : "bg-white/95 backdrop-blur-xl"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            {menuLinks.map((link, index)=> (
                <Link key={index} to={link.path} className="hover:text-primary transition-colors">
                    {link.name}
                </Link>
            ))}

            <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor/80 px-4 py-0.5 rounded-full max-w-56 bg-white/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
                <input type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400" placeholder="Search cars"/>
                <img src={assets.search_icon} alt="search" className="opacity-50"/>
            </div>

            <div className='flex max-sm:flex-col items-start sm:items-center gap-6 mt-4 sm:mt-0'>

                <button onClick={()=> isOwner ? navigate('/owner') : changeRole()} className="cursor-pointer hover:text-primary transition-colors font-semibold">{isOwner ? 'Dashboard' : 'List cars'}</button>

                {user && !isOwner && (
                    <button onClick={()=> navigate('/profile')} className="cursor-pointer hover:text-primary transition-colors font-semibold">Profile</button>
                )}

                <button onClick={()=> {user ? logout() : setShowLogin(true)}} className="cursor-pointer px-8 py-2.5 bg-primary hover:bg-primary-dull transition-all text-white font-semibold rounded-xl shadow-md hover:shadow-lg">{user ? 'Logout' : 'Login'}</button>
            </div>
        </div>

        <button className='sm:hidden cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors' aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      
    </motion.div>
  )
}

export default Navbar
