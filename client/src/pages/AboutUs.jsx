import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-6xl mx-auto'
    >
      {/* Header */}
      <div className='text-center mb-16'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-4xl md:text-5xl font-bold text-gray-800'
        >
          About <span className='text-primary'>CarRental</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-4 text-gray-500 text-lg max-w-2xl mx-auto'
        >
          Your trusted partner for premium car rentals. We connect car owners with renters, making mobility accessible and effortless.
        </motion.p>
      </div>

      {/* Our Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 mb-12'
      >
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>🚗 Our Story</h2>
        <p className='text-gray-600 leading-relaxed'>
          Founded with a vision to revolutionize the car rental industry in India, CarRental brings together car owners and renters on a single, seamless platform. We started with a simple idea — make luxury and everyday vehicles accessible to everyone, while helping car owners earn passive income from their vehicles. Today, we serve thousands of customers across multiple cities, offering a diverse fleet of cars for every occasion.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4'>
            <span className='text-2xl'>🎯</span>
          </div>
          <h3 className='text-xl font-bold text-gray-800 mb-3'>Our Mission</h3>
          <p className='text-gray-600 leading-relaxed'>
            To provide a seamless, trustworthy, and affordable car rental experience. We aim to bridge the gap between car owners looking to monetize their vehicles and renters seeking reliable transportation for their journeys.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4'>
            <span className='text-2xl'>🔭</span>
          </div>
          <h3 className='text-xl font-bold text-gray-800 mb-3'>Our Vision</h3>
          <p className='text-gray-600 leading-relaxed'>
            To become India's most trusted peer-to-peer car rental marketplace, making personal mobility accessible, sustainable, and community-driven. We envision a future where every car on the road can serve more people.
          </p>
        </motion.div>
      </div>

      {/* Our Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-12'
      >
        <h2 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Our Core Values</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            { icon: '🛡️', title: 'Trust & Safety', desc: 'Every driver is verified. Every vehicle is insured. Your safety is our top priority.' },
            { icon: '💎', title: 'Quality First', desc: 'We maintain high standards for every vehicle listed on our platform.' },
            { icon: '🤝', title: 'Community', desc: 'We believe in building strong relationships between car owners and renters.' },
            { icon: '⚡', title: 'Innovation', desc: 'Continuously improving our technology to deliver a seamless booking experience.' },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className='bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/30 hover:shadow-md transition-all'
            >
              <span className='text-3xl block mb-3'>{value.icon}</span>
              <h4 className='font-semibold text-gray-800 mb-2'>{value.title}</h4>
              <p className='text-gray-500 text-sm'>{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gradient-to-r from-primary to-secondary/80 rounded-2xl p-8 md:p-12 text-white'
      >
        <h2 className='text-2xl font-bold mb-6'>Why Choose CarRental?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            { num: '500+', label: 'Vehicles Available' },
            { num: '50+', label: 'Cities Covered' },
            { num: '10,000+', label: 'Happy Customers' },
          ].map((stat, index) => (
            <div key={index} className='text-center'>
              <p className='text-3xl font-bold'>{stat.num}</p>
              <p className='text-white/80 mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AboutUs
