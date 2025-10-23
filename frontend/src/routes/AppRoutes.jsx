import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddUser from '../pages/AddUser'
import EditUser from '../pages/EditUser'
import UserDetails from '../pages/UserDetails'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  )
}

export default AppRoutes
