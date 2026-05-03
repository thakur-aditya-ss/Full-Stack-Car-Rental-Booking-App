import React, { useState } from 'react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'

const PaymentModal = ({ booking, onClose, onSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)

  const paymentMethods = [
    { id: 'upi', label: 'UPI' },
    { id: 'debit', label: 'Debit Card' },
    { id: 'credit', label: 'Credit Card' },
    { id: 'netbanking', label: 'Net Banking' },
    { id: 'qr', label: 'QR Code' }
  ]

  const upiId = 'aaasingh1010@okhdfcbank'
  const upiString = `upi://pay?pa=${upiId}&pn=CarRental&am=${booking.price}&cu=INR`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`

  const handlePayment = async (e) => {
    e.preventDefault()
    
    if (selectedMethod === 'credit' || selectedMethod === 'debit' || selectedMethod === 'netbanking') {
      toast.error('Service not available. Please use UPI or QR Code.')
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess(booking._id)
    }, 2000)
  }

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row'
      >
        {/* Left Side: Payment Summary */}
        <div className='bg-primary text-white p-8 md:w-2/5 flex flex-col justify-between'>
          <div>
            <h2 className='text-2xl font-bold mb-6'>Payment Summary</h2>
            <div className='space-y-4 text-primary-content/80'>
              <div>
                <p className='text-sm opacity-80'>Car</p>
                <p className='font-medium text-lg'>{booking.car.brand} {booking.car.model}</p>
              </div>
              <div>
                <p className='text-sm opacity-80'>Booking ID</p>
                <p className='font-medium text-sm truncate'>#{booking._id}</p>
              </div>
              <div>
                <p className='text-sm opacity-80'>Total Amount to Pay</p>
                <h1 className='text-3xl font-bold text-white mt-1'>₹{booking.price}</h1>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className='mt-8 w-max text-sm opacity-80 hover:opacity-100 flex items-center gap-2 transition-opacity cursor-pointer'
          >
            ← Cancel Payment
          </button>
        </div>

        {/* Right Side: Payment Methods */}
        <div className='p-8 md:w-3/5 bg-gray-50 flex flex-col h-full'>
          <h3 className='text-xl font-bold mb-6 text-gray-800'>Select Payment Method</h3>
          
          <div className='flex flex-wrap gap-2 mb-8'>
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all border cursor-pointer ${
                  selectedMethod === method.id 
                    ? 'bg-primary text-white border-primary shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          <div className='flex-grow flex flex-col justify-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[280px]'>
            {selectedMethod === 'qr' ? (
              <div className='flex flex-col items-center justify-center text-center space-y-4'>
                <p className='text-gray-600 font-medium mb-2'>Scan QR Code with any UPI App</p>
                <div className='p-2 bg-white border-2 border-gray-200 rounded-xl shadow-inner'>
                  <img src={qrCodeUrl} alt="Payment QR Code" className='w-48 h-48'/>
                </div>
                <p className='text-sm text-gray-500'>UPI ID: <span className='font-semibold text-gray-800'>{upiId}</span></p>
              </div>
            ) : selectedMethod === 'upi' ? (
              <div className='flex flex-col items-center justify-center text-center space-y-6 h-full'>
                <p className='text-gray-600 font-medium'>Pay directly using your installed UPI App</p>
                <a 
                  href={upiString} 
                  className="px-8 py-3.5 bg-[#5f259f] hover:bg-[#4a1c7c] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:max-w-xs block"
                >
                  Pay ₹{booking.price} via UPI App
                </a>
                <p className='text-sm text-gray-500 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100'>
                  After completing the payment on your app, click the <span className='font-semibold text-gray-700'>Verify Payment</span> button below.
                </p>
              </div>
            ) : (
              <form id="payment-form" onSubmit={handlePayment} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Card / Account Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" required className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all' />
                </div>
                {(selectedMethod === 'credit' || selectedMethod === 'debit') && (
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Expiry</label>
                      <input type="text" placeholder="MM/YY" required className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>CVV</label>
                      <input type="password" placeholder="•••" required className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all' />
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          <button 
            type="submit"
            form={(selectedMethod !== 'qr' && selectedMethod !== 'upi') ? "payment-form" : undefined}
            disabled={isProcessing}
            className={`w-full mt-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all cursor-pointer ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 hover:-translate-y-0.5'
            }`}
            onClick={(e) => {
              if (selectedMethod === 'qr' || selectedMethod === 'upi') {
                 handlePayment(e);
              }
            }}
          >
            {isProcessing ? 'Processing Payment...' : selectedMethod === 'upi' ? 'Verify Payment' : `Complete Payment of ₹${booking.price}`}
          </button>
        </div>

      </motion.div>
    </div>
  )
}

export default PaymentModal
