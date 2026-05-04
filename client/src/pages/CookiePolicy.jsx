import React from 'react'
import { motion } from 'motion/react'

const sections = [
  { title: '1. What Are Cookies?', content: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, keep you logged in, and understand how you use our platform to improve your experience.' },
  { title: '2. Essential Cookies', content: 'These cookies are necessary for the website to function properly. They enable core features like user authentication, session management, and security. Without these cookies, you cannot use services like booking a car or managing your account. These cannot be disabled.' },
  { title: '3. Functional Cookies', content: 'These cookies remember your preferences and settings, such as your login credentials (via localStorage token), selected dates, and display preferences. They enhance your experience by personalizing the platform to your needs.' },
  { title: '4. Analytics Cookies', content: 'We may use analytics cookies to understand how visitors interact with our platform. This helps us identify popular features, detect issues, and improve overall performance. The data collected is aggregated and anonymous.' },
  { title: '5. How We Use Local Storage', content: 'CarRental uses browser local storage to store your authentication token securely. This allows you to stay logged in across sessions without re-entering your credentials. Logging out clears this stored data.' },
  { title: '6. Third-Party Cookies', content: 'Some third-party services integrated into our platform (such as payment processors and QR code generators) may set their own cookies. We do not control these cookies and recommend reviewing the privacy policies of these services.' },
  { title: '7. Managing Cookies', content: 'You can manage or delete cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling essential cookies may prevent you from using certain features of our platform.' },
  { title: '8. Changes to This Policy', content: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our platform constitutes acceptance of the updated policy.' },
]

const CookiePolicy = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-5xl mx-auto'>
      <div className='text-center mb-16'>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className='text-4xl md:text-5xl font-bold text-gray-800'>
          Cookie <span className='text-primary'>Policy</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className='mt-4 text-gray-500 text-lg'>
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className='mt-2 text-gray-500 max-w-2xl mx-auto'>
          This policy explains how CarRental uses cookies and similar technologies on our platform.
        </motion.p>
      </div>

      {/* Cookie Types Visual */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'>
        {[
          { icon: '🔒', name: 'Essential', desc: 'Required for basic functionality', color: 'bg-green-50 border-green-200' },
          { icon: '⚙️', name: 'Functional', desc: 'Remembers your preferences', color: 'bg-blue-50 border-blue-200' },
          { icon: '📊', name: 'Analytics', desc: 'Helps us improve the platform', color: 'bg-purple-50 border-purple-200' },
        ].map((type, i) => (
          <div key={i} className={`${type.color} border rounded-xl p-5 text-center`}>
            <span className='text-2xl block mb-2'>{type.icon}</span>
            <h4 className='font-semibold text-gray-800'>{type.name}</h4>
            <p className='text-gray-500 text-sm mt-1'>{type.desc}</p>
          </div>
        ))}
      </motion.div>

      <div className='space-y-8'>
        {sections.map((section, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className='bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-colors'>
            <h2 className='text-lg font-bold text-gray-800 mb-3'>{section.title}</h2>
            <p className='text-gray-600 leading-relaxed'>{section.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center'>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>Questions About Cookies?</h3>
        <p className='text-gray-500'>Contact us at <a href="mailto:carrentalwebapplication2025@gmail.com" className='text-primary hover:underline'>carrentalwebapplication2025@gmail.com</a></p>
      </motion.div>
    </motion.div>
  )
}

export default CookiePolicy
