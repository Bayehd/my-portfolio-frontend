import { useState, useEffect } from 'react'
import { usersAPI } from '../services/api'
import '../styles/users.css'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getAll()
      if (response.data.success) {
        setUsers(response.data.data)
      }
      setError(null)
    } catch (err) {
      setError('Failed to load users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingUser) {
        await usersAPI.update(editingUser.id, formData)
      } else {
        await usersAPI.create(formData)
      }

      setShowForm(false)
      setEditingUser(null)
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      })
      fetchUsers()
    } catch (err) {
      console.error('Error saving user:', err)
      alert('Failed to save user. Please try again.')
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: '' // Don't show password
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(id)
        fetchUsers()
      } catch (err) {
        console.error('Error deleting user:', err)
        alert('Failed to delete user. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingUser(null)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    })
  }

  if (loading) {
    return (
      <div className="users-page">
        <div className="users-container">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="users-page">
      <div className="users-container">
        <div className="users-header">
          <h1>Users Management</h1>
          <p className="text-muted">
            Manage user accounts (Admin Only)
          </p>
          
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            + Add New User
          </button>
        </div>

        {error && (
          <div style={{ 
            color: '#ef4444', 
            padding: '1rem', 
            textAlign: 'center',
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        {/* User Form Modal */}
        {showForm && (
          <div className="modal-overlay active">
            <div className="modal-content">
              <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
              
              <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Password {editingUser ? '' : '*'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editingUser}
                    placeholder={editingUser ? 'Leave blank to keep current password' : ''}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingUser ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="users-table-container">
          {users.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No users yet. Click "Add New User" to get started!
            </p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstname} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.created ? new Date(user.created).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn"
                          style={{ 
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            background: '#ef4444',
                            color: 'white'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Users