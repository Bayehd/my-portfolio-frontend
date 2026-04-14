import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token) {
      // Redirect to login if not authenticated
      navigate('/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user.firstname}!</h1>
        </div>

        <div className="dashboard-grid">
          <Link to="/projects" className="dashboard-card">
            <h3>Manage Projects</h3>
            <p>Add, edit, or delete your projects</p>
          </Link>

          <Link to="/services" className="dashboard-card">
            <h3>Manage Services</h3>
            <p>Add, edit, or delete your services</p>
          </Link>

          <Link to="/references" className="dashboard-card">
            <h3>Manage References</h3>
            <p>Add, edit, or delete your references</p>
          </Link>

          <Link to="/users" className="dashboard-card">
            <h3>Manage Users</h3>
            <p>View and manage user accounts</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard