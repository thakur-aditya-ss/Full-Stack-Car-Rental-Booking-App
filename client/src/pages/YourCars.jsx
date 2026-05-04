import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const YourCars = () => {

  const { axios, user } = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async ()=>{
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    user && fetchMyBookings()
  },[user])

  return (
    <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    
    className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>

      <Title title='Your Cars'
       subTitle='Overview of the cars you have booked'
       align="left"/>

       <div>
        {bookings.filter(b => b.car).map((booking, index)=>(
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          
          key={booking._id} className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 items-center'>
            {/* Car Image */}
            <div>
              <div className='rounded-md overflow-hidden'>
                <img src={booking.car.image} alt="" className='w-full max-w-md h-auto aspect-video object-cover'/>
              </div>
            </div>

            {/* Car Details & Date */}
            <div className='flex flex-col gap-3'>
              <p className='text-2xl font-bold text-gray-800'>{booking.car.brand} {booking.car.model}</p>
              <div className='flex flex-wrap gap-2 text-gray-600 font-medium'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full'>{booking.car.year}</span>
                  <span className='bg-gray-100 px-3 py-1 rounded-full'>{booking.car.category}</span>
                  <span className='bg-gray-100 px-3 py-1 rounded-full'>{booking.car.location}</span>
              </div>
              <div className='mt-4 pt-4 border-t border-gray-100'>
                  <p className='text-gray-500'>Booking Date</p>
                  <p className='text-lg font-semibold text-gray-700'>{new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

          </motion.div>
        ))}
        {bookings.length === 0 && (
          <p className='mt-10 text-gray-500 text-center text-lg'>You have not booked any cars yet.</p>
        )}
       </div>
      
    </motion.div>
  )
}

export default YourCars
