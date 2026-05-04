import React, { useState } from 'react'
import { motion } from 'motion/react'

const faqs = [
  {
    category: '🚗 Booking',
    items: [
      { q: 'How do I book a car?', a: 'Browse our available cars, select your preferred vehicle, choose your pickup and return dates, enter your pickup address, and click "Book Now". You need to be logged in and have a complete profile to make a booking.' },
      { q: 'Can I cancel my booking?', a: 'Currently, bookings once confirmed cannot be cancelled through the app. Please contact our support team for cancellation requests.' },
      { q: 'How are rental prices calculated?', a: 'Rental prices are calculated on a per-day basis. The total cost is the daily rate multiplied by the number of rental days.' },
      { q: 'Do I need to complete my profile before booking?', a: 'Yes, you must complete your profile with your date of birth, age, mobile number, Aadhar number, PAN number, licence number, and address before making a booking.' },
    ]
  },
  {
    category: '💳 Payments',
    items: [
      { q: 'What payment methods are accepted?', a: 'We accept UPI payments, credit/debit cards, and QR code-based payments. All transactions are processed securely.' },
      { q: 'When do I need to pay?', a: 'Payment is required after your booking is confirmed by the car owner. You can pay using the "Pay Now" button in your My Bookings section.' },
      { q: 'Is my payment information secure?', a: 'Yes, all payment transactions are encrypted and processed through secure payment gateways. We do not store your card details.' },
    ]
  },
  {
    category: '👤 Account',
    items: [
      { q: 'How do I create an account?', a: 'Click on the "Login" button in the navigation bar, then select "Create an account". Fill in your name, email, and password to register.' },
      { q: 'I forgot my password. What do I do?', a: 'On the login page, click "Forgot Password?" and enter your email and new password to reset it.' },
      { q: 'Can I be both a renter and a car owner?', a: 'You need separate accounts for renting (User) and listing cars (Admin/Owner). Choose the appropriate role while signing up.' },
    ]
  },
  {
    category: '🏠 For Car Owners',
    items: [
      { q: 'How do I list my car?', a: 'Sign up as an Admin/Owner, go to your Owner Panel, and click "Add Car". Fill in the car details including brand, model, price, location, and upload images.' },
      { q: 'How do I manage bookings?', a: 'From your owner panel, go to "Manage Bookings" to view, confirm, or manage all bookings for your listed vehicles.' },
      { q: 'Can I set my own rental price?', a: 'Yes, you have full control over the daily rental price of your vehicle when listing it on the platform.' },
    ]
  },
]

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  let globalIndex = 0

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
          Help <span className='text-primary'>Center</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-4 text-gray-500 text-lg max-w-2xl mx-auto'
        >
          Find answers to frequently asked questions and get the support you need.
        </motion.p>
      </div>

      {/* Contact Support Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='bg-gradient-to-r from-primary to-secondary/80 rounded-2xl p-6 md:p-8 text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-4'
      >
        <div>
          <h3 className='text-xl font-bold'>Need Direct Support?</h3>
          <p className='text-white/80 mt-1'>Reach out to us and we'll get back to you within 24 hours.</p>
        </div>
        <a href="mailto:carrentalwebapplication2025@gmail.com" className='px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-lg whitespace-nowrap'>
          📧 Email Us
        </a>
      </motion.div>

      {/* FAQs */}
      {faqs.map((section, sIdx) => (
        <motion.div
          key={sIdx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10'
        >
          <h2 className='text-xl font-bold text-gray-800 mb-4'>{section.category}</h2>
          <div className='space-y-3'>
            {section.items.map((faq, fIdx) => {
              const currentIndex = globalIndex++
              const isOpen = openIndex === currentIndex
              return (
                <div
                  key={fIdx}
                  className='border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors'
                >
                  <button
                    onClick={() => toggleFaq(currentIndex)}
                    className='w-full flex items-center justify-between p-4 md:p-5 text-left cursor-pointer bg-white hover:bg-gray-50 transition-colors'
                  >
                    <span className='font-medium text-gray-700 pr-4'>{faq.q}</span>
                    <span className={`text-primary text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4 px-4 md:px-5' : 'max-h-0'}`}>
                    <p className='text-gray-500 leading-relaxed'>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Still Need Help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center'
      >
        <h3 className='text-xl font-bold text-gray-800 mb-2'>Still Have Questions?</h3>
        <p className='text-gray-500 mb-4'>Our support team is available to help you with any queries.</p>
        <p className='text-gray-600'>📞 +1 234 567890</p>
        <p className='text-gray-600'>📧 carrentalwebapplication2025@gmail.com</p>
      </motion.div>
    </motion.div>
  )
}

export default HelpCenter
