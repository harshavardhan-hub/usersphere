import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../services/api'
import UserForm from '../components/UserForm'

const AddUser = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (userData) => {
    try {
      setIsLoading(true)
      setError(null)
      await userAPI.createUser(userData)
      alert('User created successfully!')
      navigate('/')
    } catch (err) {
      setError(err.message)
      alert(`Failed to create user: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New User</h1>
        <p className="text-gray-600">Fill in the details to create a new user</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

export default AddUser
