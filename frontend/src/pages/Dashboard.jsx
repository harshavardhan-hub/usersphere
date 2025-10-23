import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import UserList from '../components/UserList'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([]) // Store all users for live search
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50, // Increase limit to get all users at once
    total: 0,
    totalPages: 0
  })

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userAPI.getAllUsers({ page: 1, limit: 100 }) // Get all users
      
      // Sort users alphabetically by name (A-Z)
      const sortedUsers = response.data.sort((a, b) => 
        a.name.localeCompare(b.name)
      )
      
      setAllUsers(sortedUsers)
      setUsers(sortedUsers)
      setPagination(response.pagination)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Live search - filters as user types
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setUsers(allUsers)
    } else {
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.phone.includes(searchTerm) ||
        user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setUsers(filtered)
    }
  }, [searchTerm, allUsers])

  const handleDelete = async (userId) => {
    try {
      await userAPI.deleteUser(userId)
      fetchUsers() // Refresh the list
    } catch (err) {
      alert(`Failed to delete user: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage and view all users in the system</p>
        </div>

        {/* Search & Stats */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, company, phone, or city..."
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-primary-50 rounded-lg p-3 sm:p-4 border border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-primary-600 mb-0.5 sm:mb-1">Total Users</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary-900">{allUsers.length}</p>
                </div>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-green-600 mb-0.5 sm:mb-1">Showing</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-900">{users.length}</p>
                </div>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Loading message="Loading users..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchUsers} />
        ) : users.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-xl text-gray-600 font-medium">No users found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <UserList users={users} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
