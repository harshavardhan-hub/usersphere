import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userAPI } from '../services/api'
import UserForm from '../components/UserForm'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const EditUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (userData) => {
    try {
      setIsSubmitting(true)
      setError(null)
      await userAPI.updateUser(id, userData)
      alert('User updated successfully!')
      navigate('/')
    } catch (err) {
      setError(err.message)
      alert(`Failed to update user: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loading message="Loading user details..." />
  }

  if (error && !user) {
    return <ErrorMessage message={error} onRetry={fetchUser} />
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit User</h1>
        <p className="text-gray-600">Update user information</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <UserForm initialData={user} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  )
}

export default EditUser
