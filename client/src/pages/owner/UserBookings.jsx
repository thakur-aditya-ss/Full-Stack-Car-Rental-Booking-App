import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Title from '../../components/Title'
import toast from 'react-hot-toast'

const UserBookings = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const { axios } = useAppContext()
    const [bookings, setBookings] = useState([])
    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUserBookings = async () => {
        try {
            const { data } = await axios.get(`/api/owner/user-bookings/${userId}`)
            if (data.success) {
                setBookings(data.bookings)
                setUserDetails(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserBookings()
    }, [userId])

    return (
        <div className="p-8 w-full bg-gray-50 flex-1 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium text-sm transition-all cursor-pointer">
                    &larr; Back
                </button>
            </div>
            
            <Title title="User Bookings" subTitle={userDetails ? `Bookings made by ${userDetails.name}` : "Loading..."} align="left" />
            
            {loading ? (
                <p className="mt-8 text-gray-500">Loading bookings...</p>
            ) : (
                <div className="flex flex-col gap-6 mt-8">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">
                            <img src={booking.car.image} alt={booking.car.brand} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                            <div className="flex flex-col gap-2 flex-1">
                                <h3 className="text-xl font-bold text-gray-800">{booking.car.brand} {booking.car.model}</h3>
                                <p className="text-gray-500 text-sm">{booking.car.year} • {booking.car.category}</p>
                                
                                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase font-semibold">From</span>
                                        <span className="font-medium text-gray-700">{new Date(booking.pickupDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase font-semibold">To</span>
                                        <span className="font-medium text-gray-700">{new Date(booking.returnDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase font-semibold">Status</span>
                                        <span className={`font-medium text-sm px-2 py-0.5 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {bookings.length === 0 && <p className="text-gray-500">This user has not made any bookings yet.</p>}
                </div>
            )}
        </div>
    )
}

export default UserBookings
