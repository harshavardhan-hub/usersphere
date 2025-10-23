import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { userAPI } from '../services/api'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const UserDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [id])

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userAPI.getUserById(id)
      setUser(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await userAPI.deleteUser(id)
        alert('User deleted successfully!')
        navigate('/')
      } catch (err) {
        alert(`Failed to delete user: ${err.message}`)
      }
    }
  }

  if (loading) {
    return <Loading message="Loading user details..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUser} />
  }

  if (!user) {
    return <ErrorMessage message="User not found" />
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Details</h1>
          <p className="text-gray-600">View complete user information</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            {user.company && (
              <p className="text-lg text-gray-600">{user.company}</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-gray-800 font-medium">{user.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">Street</p>
                <p className="text-gray-800">{user.address.street}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">City</p>
                  <p className="text-gray-800">{user.address.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
                  <p className="text-gray-800">{user.address.zip}</p>
                </div>
              </div>
              {user.address.geo && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Latitude</p>
                    <p className="text-gray-800 font-mono text-sm">{user.address.geo.lat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Longitude</p>
                    <p className="text-gray-800 font-mono text-sm">{user.address.geo.lng}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">User ID</p>
                <p className="text-gray-800 font-mono">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Created At</p>
                <p className="text-gray-800">{new Date(user.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
          <Link
            to={`/edit-user/${user.id}`}
            className="flex-1 px-6 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Edit User
          </Link>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
