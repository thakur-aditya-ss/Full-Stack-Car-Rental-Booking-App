import React from 'react'
import { motion } from 'motion/react'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the CarRental platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. These terms apply to all users, including car owners (Admins) and renters (Users).'
  },
  {
    title: '2. User Accounts',
    content: 'You must register an account to use our services. You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration, including your name, email, date of birth, Aadhar number, PAN number, driving licence number, and contact details. You may not use another person\'s account without permission.'
  },
  {
    title: '3. Eligibility',
    content: 'You must be at least 18 years of age with a valid Indian driving licence to rent a vehicle. Car owners must have valid vehicle registration and insurance documents. All users must complete their profile verification before making or accepting bookings.'
  },
  {
    title: '4. Booking & Rental Terms',
    content: 'All bookings are subject to vehicle availability. Rental periods are calculated on a daily basis. You must pick up and return the vehicle at the agreed-upon location and time. Any extension of the rental period must be communicated and approved by the car owner. The renter is responsible for the vehicle during the rental period.'
  },
  {
    title: '5. Payments & Pricing',
    content: 'All prices are listed in Indian Rupees (₹). Payment must be completed through the platform\'s accepted payment methods (UPI, cards, QR code). Car owners set their own daily rental prices. CarRental may charge a service fee on transactions. Refund policies are determined on a case-by-case basis.'
  },
  {
    title: '6. Vehicle Condition & Responsibilities',
    content: 'Car owners must ensure their vehicles are in safe, roadworthy condition. Renters must return the vehicle in the same condition as received, accounting for normal wear and tear. Any damage caused during the rental period is the renter\'s responsibility. Renters must not use the vehicle for illegal activities, racing, or sub-renting.'
  },
  {
    title: '7. Insurance & Liability',
    content: 'Basic insurance coverage is provided for all rentals through our platform. Additional coverage may be available at extra cost. CarRental is not liable for personal belongings left in rental vehicles. Users are responsible for any traffic violations or fines incurred during the rental period.'
  },
  {
    title: '8. Prohibited Activities',
    content: 'Users may not: use the platform for fraudulent purposes, provide false information, damage or misuse rental vehicles, use vehicles under the influence of alcohol or drugs, exceed geographical boundaries without prior approval, or engage in any activity that violates local laws.'
  },
  {
    title: '9. Account Termination',
    content: 'CarRental reserves the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or receive repeated complaints. Users may delete their accounts at any time by contacting support.'
  },
  {
    title: '10. Changes to Terms',
    content: 'CarRental reserves the right to modify these Terms of Service at any time. Users will be notified of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the updated terms.'
  },
]

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-5xl mx-auto'
    >
      {/* Header */}
      <div className='text-center mb-16'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-4xl md:text-5xl font-bold text-gray-800'
        >
          Terms of <span className='text-primary'>Service</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-4 text-gray-500 text-lg'
        >
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
      </div>

      {/* Sections */}
      <div className='space-y-8'>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className='bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-colors'
          >
            <h2 className='text-lg font-bold text-gray-800 mb-3'>{section.title}</h2>
            <p className='text-gray-600 leading-relaxed'>{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center'
      >
        <h3 className='text-xl font-bold text-gray-800 mb-2'>Questions About Our Terms?</h3>
        <p className='text-gray-500'>Contact us at <a href="mailto:carrentalwebapplication2025@gmail.com" className='text-primary hover:underline'>carrentalwebapplication2025@gmail.com</a></p>
      </motion.div>
    </motion.div>
  )
}

export default TermsOfService
