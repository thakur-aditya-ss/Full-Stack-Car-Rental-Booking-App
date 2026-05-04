import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'

const Banner = () => {
  const { user, isOwner, navigate, setShowLogin, setDefaultLoginRole } = useAppContext()

  const handleListCar = () => {
    if (user && isOwner) {
      navigate('/owner')
    } else {
      setDefaultLoginRole('owner')
      setShowLogin(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-primary to-secondary/80 max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden shadow-2xl relative'>
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none'></div>

      <div className='text-white relative z-10'>
        <h2 className='text-4xl font-bold tracking-tight'>Do You Own a Luxury Car?</h2>
        <p className='mt-3 text-white/90 text-lg'>Monetize your vehicle effortlessly by listing it on CarRental.</p>
        {/* <p className='max-w-130'>We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.</p> */}
        <p className='max-w-130 text-white/80 mt-1 leading-relaxed'>We take care of insurance and driver verification — so you can earn passive income, stress-free.</p>

        <motion.button
          onClick={handleListCar}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className='px-8 py-3 bg-white hover:bg-slate-50 transition-all text-primary font-semibold rounded-xl text-sm mt-6 cursor-pointer shadow-lg'>List your car</motion.button>
      </div>

      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image} alt="car" className='max-h-45 mt-10' />

    </motion.div>
  );
};

export default Banner;
