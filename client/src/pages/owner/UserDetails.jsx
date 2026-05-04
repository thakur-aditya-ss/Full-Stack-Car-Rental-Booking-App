import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import Title from '../../components/Title'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserDetails = () => {
    const navigate = useNavigate()
    const { axios, user } = useAppContext()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/owner/users')
            if (data.success) {
                setUsers(data.users)
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
        user && fetchUsers()
    }, [user])

    return (
        <div className="p-8 w-full bg-gray-50 flex-1 h-[calc(100vh-80px)] overflow-y-auto">
            <Title title="User Details" subTitle="View profile details of users who have booked your cars" align="left" />
            
            {loading ? (
                <p className="mt-8 text-gray-500">Loading users...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                    {users.map((u) => (
                        <div onClick={() => navigate(`/owner/user-bookings/${u._id}`)} key={u._id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-4 cursor-pointer hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <img src={u.image || '/src/assets/user_profile.png'} alt="User" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{u.name}</h3>
                                    <p className="text-sm text-gray-500">{u.email}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">Gender</span>
                                    <span className="font-medium text-gray-700">{u.gender || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">Age / DOB</span>
                                    <span className="font-medium text-gray-700">{u.age ? `${u.age} yrs` : 'N/A'} {u.dob ? `(${u.dob})` : ''}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">Mobile</span>
                                    <span className="font-medium text-gray-700">{u.mobileNumber || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">Aadhar</span>
                                    <span className="font-medium text-gray-700">{u.aadharNumber || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">PAN</span>
                                    <span className="font-medium text-gray-700">{u.panNumber || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">Licence</span>
                                    <span className="font-medium text-gray-700">{u.licenceNumber || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col col-span-2 mt-2">
                                    <span className="text-xs text-gray-400 uppercase font-semibold">Address</span>
                                    <span className="font-medium text-gray-700">{u.address || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && <p className="text-gray-500 col-span-full">No users found.</p>}
                </div>
            )}
        </div>
    )
}

export default UserDetails
