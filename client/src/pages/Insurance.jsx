import React from 'react'
import { motion } from 'motion/react'

const coverageTypes = [
  { icon: '🛡️', title: 'Basic Coverage', desc: 'Included with every rental at no extra cost. Covers third-party liability and basic vehicle damage up to ₹2,00,000.', tag: 'Included' },
  { icon: '⭐', title: 'Standard Coverage', desc: 'Enhanced protection covering collision damage, theft, and third-party liability up to ₹5,00,000. Reduced deductible of ₹10,000.', tag: '₹199/day' },
  { icon: '💎', title: 'Premium Coverage', desc: 'Complete peace of mind with zero deductible. Covers all damages, theft, personal accident, and roadside assistance up to ₹10,00,000.', tag: '₹399/day' },
]

const faqs = [
  { q: 'Is insurance included with every rental?', a: 'Yes, basic third-party liability insurance is included with every booking at no additional cost.' },
  { q: 'What happens if the car gets damaged?', a: 'Damage is assessed upon vehicle return. Basic coverage has a deductible. Upgrade to Premium for zero-deductible coverage.' },
  { q: 'Does insurance cover theft?', a: 'Theft is covered under Standard and Premium plans. Basic coverage does not include theft protection.' },
  { q: 'How do I file a claim?', a: 'Contact our support team immediately. Document the incident with photos and file a police report if applicable.' },
  { q: 'Are all drivers covered?', a: 'Only the registered renter listed on the booking is covered. Additional drivers must be declared before the rental period.' },
]

const Insurance = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-6xl mx-auto'>
      <div className='text-center mb-16'>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className='text-4xl md:text-5xl font-bold text-gray-800'>
          Insurance <span className='text-primary'>Coverage</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className='mt-4 text-gray-500 text-lg max-w-2xl mx-auto'>
          Drive with confidence. Every CarRental booking comes with insurance coverage to protect you and the vehicle.
        </motion.p>
      </div>

      {/* Coverage Plans */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
        {coverageTypes.map((plan, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`bg-white border rounded-2xl p-8 hover:shadow-lg transition-all ${index === 2 ? 'border-primary shadow-md ring-2 ring-primary/20' : 'border-gray-200'}`}>
            <span className='text-3xl block mb-4'>{plan.icon}</span>
            <div className='flex items-center gap-2 mb-3'>
              <h3 className='text-xl font-bold text-gray-800'>{plan.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${index === 0 ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>{plan.tag}</span>
            </div>
            <p className='text-gray-600 leading-relaxed'>{plan.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* What's Covered */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='bg-gradient-to-r from-primary to-secondary/80 rounded-2xl p-8 md:p-12 text-white mb-16'>
        <h2 className='text-2xl font-bold mb-6'>What's Covered?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {['Third-party liability', 'Collision damage', 'Theft protection', 'Personal accident cover', 'Roadside assistance', 'Zero depreciation'].map((item, i) => (
            <div key={i} className='flex items-center gap-2'><span className='text-green-300'>✓</span><span className='text-white/90'>{item}</span></div>
          ))}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Insurance FAQs</h2>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/20 transition-colors'>
              <h4 className='font-semibold text-gray-800 mb-2'>{faq.q}</h4>
              <p className='text-gray-500'>{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Insurance
