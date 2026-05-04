import React from 'react'
import { motion } from 'motion/react'

const sections = [
  { title: '1. Information We Collect', content: 'We collect personal information that you provide during registration including your name, email, date of birth, mobile number, Aadhar number, PAN number, driving licence number, address, gender, and profile picture. We also collect booking and payment details.' },
  { title: '2. How We Use Your Information', content: 'Your information is used to create and manage your account, process bookings and payments, verify your identity, communicate updates, improve our services, and comply with legal obligations.' },
  { title: '3. Information Sharing', content: 'We share limited info with car owners when you book. We do not sell your data. We may share with payment processors and when required by law.' },
  { title: '4. Data Security', content: 'We implement industry-standard security measures. Passwords are encrypted. Payment info is processed through secure channels. We regularly update our security practices.' },
  { title: '5. Document Verification', content: 'Government IDs (Aadhar, PAN, Driving Licence) are collected for verification and stored securely, accessed only by authorized personnel.' },
  { title: '6. Cookies & Tracking', content: 'We use cookies and local storage for login sessions and preferences. You can control cookie settings through your browser.' },
  { title: '7. Your Rights', content: 'You can access, update, correct, or request deletion of your personal data. You may opt out of marketing communications at any time.' },
  { title: '8. Data Retention', content: 'Data is retained while your account is active. Booking records are kept for legal purposes. Account deletion removes data within 30 days.' },
  { title: '9. Children\'s Privacy', content: 'Our platform is not for users under 18. We do not knowingly collect information from minors.' },
  { title: '10. Changes to This Policy', content: 'We may update this policy and will notify you of significant changes. Continued use constitutes acceptance of the updated policy.' },
]

const PrivacyPolicy = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-5xl mx-auto'>
      <div className='text-center mb-16'>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className='text-4xl md:text-5xl font-bold text-gray-800'>
          Privacy <span className='text-primary'>Policy</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className='mt-4 text-gray-500 text-lg'>
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className='mt-2 text-gray-500 max-w-2xl mx-auto'>
          Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </motion.p>
      </div>
      <div className='space-y-8'>
        {sections.map((section, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className='bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-colors'>
            <h2 className='text-lg font-bold text-gray-800 mb-3'>{section.title}</h2>
            <p className='text-gray-600 leading-relaxed'>{section.content}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border border-gray-200 rounded-2xl p-8 text-center'>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>Privacy Concerns?</h3>
        <p className='text-gray-500'>Contact our privacy team at <a href="mailto:carrentalwebapplication2025@gmail.com" className='text-primary hover:underline'>carrentalwebapplication2025@gmail.com</a></p>
      </motion.div>
    </motion.div>
  )
}

export default PrivacyPolicy
