import { useState, useEffect } from 'react'
import { referencesAPI } from '../services/api'
import '../styles/references.css'

function References() {
  const [references, setReferences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingReference, setEditingReference] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    position: '',
    company: ''
  })

  useEffect(() => {
    fetchReferences()
  }, [])

  const fetchReferences = async () => {
    try {
      setLoading(true)
      const response = await referencesAPI.getAll()
      if (response.data.success) {
        setReferences(response.data.data)
      }
      setError(null)
    } catch (err) {
      setError('Failed to load references')
      console.error('Error fetching references:', err)
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
      if (editingReference) {
        await referencesAPI.update(editingReference.id, formData)
      } else {
        await referencesAPI.create(formData)
      }

      setShowForm(false)
      setEditingReference(null)
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        position: '',
        company: ''
      })
      fetchReferences()
    } catch (err) {
      console.error('Error saving reference:', err)
      alert('Failed to save reference. Please try again.')
    }
  }

  const handleEdit = (reference) => {
    setEditingReference(reference)
    setFormData({
      firstname: reference.firstname,
      lastname: reference.lastname,
      email: reference.email,
      position: reference.position,
      company: reference.company
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reference?')) {
      try {
        await referencesAPI.delete(id)
        fetchReferences()
      } catch (err) {
        console.error('Error deleting reference:', err)
        alert('Failed to delete reference. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingReference(null)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      position: '',
      company: ''
    })
  }

  if (loading) {
    return (
      <div className="references-page">
        <div className="references-container">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading references...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="references-page">
      <div className="references-container">
        <div className="references-header">
          <h1>Professional References</h1>
          <p className="text-muted">
            People I've worked with who can speak to my skills and work ethic
          </p>
          
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            + Add New Reference
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

        {/* Reference Form Modal */}
        {showForm && (
          <div className="modal-overlay active">
            <div className="modal-content">
              <h2>{editingReference ? 'Edit Reference' : 'Add New Reference'}</h2>
              
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

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Senior Developer"
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
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Tech Corp"
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
                    {editingReference ? 'Update Reference' : 'Add Reference'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* References Grid */}
        <div className="references-grid">
          {references.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No references yet. Click "Add New Reference" to get started!
            </p>
          ) : (
            references.map((reference) => (
              <div key={reference.id} className="reference-card">
                <div className="reference-avatar">
                  {reference.firstname.charAt(0)}{reference.lastname.charAt(0)}
                </div>
                
                <h3>{reference.firstname} {reference.lastname}</h3>
                <p className="reference-position">{reference.position}</p>
                <p className="reference-company">{reference.company}</p>
                <a href={`mailto:${reference.email}`} className="reference-email">
                  {reference.email}
                </a>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    onClick={() => handleEdit(reference)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reference.id)}
                    className="btn"
                    style={{ 
                      flex: 1,
                      background: '#ef4444',
                      color: 'white'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default References