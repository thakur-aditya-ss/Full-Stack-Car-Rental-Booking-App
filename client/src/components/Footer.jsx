import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Logo from './Logo';

const Footer = () => {
  const navigate = useNavigate()
  const { user, isOwner, setShowLogin, setDefaultLoginRole } = useAppContext()

  const handleBrowseCars = (e) => {
    e.preventDefault()
    if (!user) {
      setShowLogin(true)
    } else {
      navigate('/cars')
      scrollTo(0, 0)
    }
  }

  const handleMyCars = (e) => {
    e.preventDefault()
    if (!user) {
      setShowLogin(true)
    } else {
      navigate('/your-cars')
      scrollTo(0, 0)
    }
  }

  const handleListYourCar = (e) => {
    e.preventDefault()
    if (user && isOwner) {
      navigate('/owner')
    } else {
      setDefaultLoginRole('owner')
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    
    className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            
            className='flex flex-col md:flex-row justify-between items-start gap-10 pb-6 border-borderColor border-b'>
                
                {/* Logo & Description */}
                <div className='w-full md:w-auto md:max-w-xs'>
                    <Logo />

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    className='mt-3'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    className='flex items-center gap-3 mt-6'>
                        <a href="#"> <img src={assets.facebook_logo} className='w-5 h-5' alt="" /> </a>
                        <a href="#"> <img src={assets.instagram_logo} className='w-5 h-5' alt="" /> </a>
                        <a href="#"> <img src={assets.twitter_logo} className='w-5 h-5' alt="" /> </a>
                        <a href="#"> <img src={assets.gmail_logo} className='w-5 h-5' alt="" /> </a>
                    </motion.div>
                </div>

                {/* Links Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                className='w-full md:flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8'>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); scrollTo(0,0); }}>Home</a></li>
                        <li><a href="/cars" onClick={handleBrowseCars}>Browse Cars</a></li>
                        <li><a href="/your-cars" onClick={handleMyCars}>My Cars</a></li>
                        <li><a href="/about-us" onClick={(e) => { e.preventDefault(); navigate('/about-us'); scrollTo(0,0); }}>About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="/help-center" onClick={(e) => { e.preventDefault(); navigate('/help-center'); scrollTo(0,0); }}>Help Center</a></li>
                        <li><a href="/terms-of-service" onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); scrollTo(0,0); }}>Terms of Service</a></li>
                        <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); scrollTo(0,0); }}>Privacy Policy</a></li>
                        <li><a href="/insurance" onClick={(e) => { e.preventDefault(); navigate('/insurance'); scrollTo(0,0); }}>Insurance</a></li>
                    </ul>
                </div>

                <div className='col-span-2 sm:col-span-1'>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>1234 Luxury Drive</li>
                        <li>San Francisco, CA 94107</li>
                        <li>+91 2345678900</li>
                        <li className='break-all'>carrentalwebapplication2025@gmail.com</li>
                    </ul>
                </div>

                </motion.div>

            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                
            className='flex flex-col gap-2 items-center justify-center py-5'>
                <ul className='flex items-center gap-4'>
                    <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); scrollTo(0,0); }}>Privacy</a></li>
                    <li>|</li>
                    <li><a href="/terms-of-service" onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); scrollTo(0,0); }}>Terms</a></li>
                    <li>|</li>
                    <li><a href="/cookie-policy" onClick={(e) => { e.preventDefault(); navigate('/cookie-policy'); scrollTo(0,0); }}>Cookies</a></li>
                </ul>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
            </motion.div>
        </motion.div>
  )
}

export default Footer
