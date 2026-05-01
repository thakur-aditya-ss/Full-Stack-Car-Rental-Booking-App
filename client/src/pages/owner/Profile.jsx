import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, fetchUser, axios } = useAppContext()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    aadharNumber: '',
    panNumber: '',
    licenceNumber: '',
    address: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        dob: user.dob || '',
        aadharNumber: user.aadharNumber || '',
        panNumber: user.panNumber || '',
        licenceNumber: user.licenceNumber || '',
        address: user.address || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/owner/update-profile', formData)
      if (data.success) {
        toast.success(data.message)
        fetchUser()
        setIsEditing(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-8 w-full bg-gray-50 flex-1">
      <div className="max-w-3xl border border-gray-200 rounded-xl shadow-sm bg-white p-8">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Profile</h2>
            {!isEditing && (
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="px-5 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-all cursor-pointer"
                >
                    Edit Profile
                </button>
            )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
              {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg p-2.5 outline-primary text-gray-700 bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  />
              ) : (
                  <p className="text-gray-800 font-medium py-2.5">{formData.name || '-'}</p>
              )}
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
               <p className="text-gray-800 font-medium py-2.5">{user?.email || '-'}</p>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Date of Birth</label>
              {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2.5 outline-primary text-gray-700 bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  />
              ) : (
                  <p className="text-gray-800 font-medium py-2.5">{formData.dob || '-'}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Aadhar Number</label>
              {isEditing ? (
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000"
                    className="border border-gray-300 rounded-lg p-2.5 outline-primary text-gray-700 bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  />
              ) : (
                  <p className="text-gray-800 font-medium py-2.5">{formData.aadharNumber || '-'}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">PAN Number</label>
              {isEditing ? (
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="border border-gray-300 rounded-lg p-2.5 outline-primary text-gray-700 bg-white focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                  />
              ) : (
                  <p className="text-gray-800 font-medium py-2.5 uppercase">{formData.panNumber || '-'}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Licence Number</label>
              {isEditing ? (
                  <input
                    type="text"
                    name="licenceNumber"
                    value={formData.licenceNumber}
                    onChange={handleChange}
                    placeholder="DL-00-0000-0000000"
                    className="border border-gray-300 rounded-lg p-2.5 outline-primary text-gray-700 bg-white focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                  />
              ) : (
                  <p className="text-gray-800 font-medium py-2.5 uppercase">{formData.licenceNumber || '-'}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col border-t border-gray-100 pt-6">
            <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Full Address (with Exact Location)</label>
            {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="123 Main Street, City, State, ZIP..."
                  className="border border-gray-300 rounded-lg p-3 outline-primary text-gray-700 bg-white resize-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
            ) : (
                <p className="text-gray-800 font-medium py-2.5 whitespace-pre-wrap">{formData.address || '-'}</p>
            )}
          </div>

          {isEditing && (
              <div className="flex items-center gap-4 mt-6">
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-800 transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                    Save Profile
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setIsEditing(false)
                        setFormData({
                            name: user?.name || '',
                            dob: user?.dob || '',
                            aadharNumber: user?.aadharNumber || '',
                            panNumber: user?.panNumber || '',
                            licenceNumber: user?.licenceNumber || '',
                            address: user?.address || ''
                        })
                    }}
                    className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-all cursor-pointer"
                >
                    Cancel
                </button>
              </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile
