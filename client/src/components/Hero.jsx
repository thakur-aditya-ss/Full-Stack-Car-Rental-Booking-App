import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()

    const handleSearch = (e)=>{
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className='min-h-screen flex flex-col items-center justify-center pt-24 gap-10 bg-gradient-to-b from-light to-white text-center relative overflow-hidden'>

        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl mix-blend-multiply"></div>

        <motion.div initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        className='z-10 px-4'>
            <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-dark mb-4'>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Luxury cars</span> on Rent
            </h1>
            <p className='text-gray-500 text-lg md:text-xl max-w-2xl mx-auto'>Experience the thrill of driving premium vehicles. Book your dream car instantly without any hassle.</p>
        </motion.div>
      
      <motion.form
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}

       onSubmit={handleSearch} className='z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-3 rounded-2xl md:rounded-full w-full max-w-sm md:max-w-4xl mx-4 bg-white/80 backdrop-blur-lg border border-white/50 shadow-2xl'>

        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto px-4'>
            <div className='flex flex-col items-start gap-1.5 w-full md:w-auto pb-4 md:pb-0 border-b md:border-b-0 border-gray-100 md:border-r md:pr-6'>
                <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Location</label>
                <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)} className='w-full outline-none bg-transparent font-medium text-gray-700 focus:ring-0'>
                    <option value="" disabled hidden>Select City</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            <div className='flex flex-col items-start gap-1.5 w-full md:w-auto pb-4 md:pb-0 border-b md:border-b-0 border-gray-100 md:border-r md:pr-6'>
                <label htmlFor='pickup-date' className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Pick-up Date</label>
                <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='w-full outline-none bg-transparent font-medium text-gray-700' required/>
            </div>
            <div className='flex flex-col items-start gap-1.5 w-full md:w-auto pb-4 md:pb-0'>
                <label htmlFor='return-date' className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Return Date</label>
                <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='w-full outline-none bg-transparent font-medium text-gray-700' required/>
            </div>
            
        </div>
            <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center justify-center gap-2 px-8 py-4 w-full md:w-auto mt-4 md:mt-0 bg-primary hover:bg-primary-dull transition-colors text-white font-semibold rounded-xl md:rounded-full cursor-pointer shadow-lg'>
                <img src={assets.search_icon} alt="search" className='w-5 h-5 brightness-200'/>
                Search Now
            </motion.button>
      </motion.form>

      <motion.img 
        initial={{ y: 100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.8, delay: 0.6 }}
      src={assets.main_car} alt="car" className='z-10 max-w-full md:max-w-4xl px-4 drop-shadow-2xl'/>
    </motion.div>
  )
}

export default Hero
