import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { servicesAPI } from '../services/api'
import '../styles/services.css'

//Process steps data 
const processSteps = [
  {
    id: 1,
    number: '1',
    title: 'Discovery',
    description: 'Understanding your requirements, goals, and target audience.',
  },
  {
    id: 2,
    number: '2',
    title: 'Planning',
    description: 'Creating a detailed roadmap and technical architecture.',
  },
  {
    id: 3,
    number: '3',
    title: 'Development',
    description: 'Building the solution with regular updates and feedback loops.',
  },
  {
    id: 4,
    number: '4',
    title: 'Delivery',
    description: 'Testing, deployment, and documentation for future maintenance.',
  },
]

// ServicesPage Component with CRUD
function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    image: ''
  })

  // Fetch services from backend on component mount
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await servicesAPI.getAll()
      if (response.data.success) {
        setServices(response.data.data)
      }
      setError(null)
    } catch (err) {
      setError('Failed to load services')
      console.error('Error fetching services:', err)
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
      // Convert features string to array
      const serviceData = {
        ...formData,
        features: formData.features.split(',').map(feat => feat.trim())
      }

      if (editingService) {
        // Update existing service
        await servicesAPI.update(editingService.id, serviceData)
      } else {
        // Create new service
        await servicesAPI.create(serviceData)
      }

      // Reset form and refresh services
      setShowForm(false)
      setEditingService(null)
      setFormData({
        title: '',
        description: '',
        features: '',
        image: ''
      })
      fetchServices()
    } catch (err) {
      console.error('Error saving service:', err)
      alert('Failed to save service. Please try again.')
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      features: Array.isArray(service.features) 
        ? service.features.join(', ') 
        : '',
      image: service.image || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.delete(id)
        fetchServices()
      } catch (err) {
        console.error('Error deleting service:', err)
        alert('Failed to delete service. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingService(null)
    setFormData({
      title: '',
      description: '',
      features: '',
      image: ''
    })
  }

  if (loading) {
    return (
      <div className="services-page">
        <div className="services-container">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="services-page">
      <div className="services-container">
        {/* Page Header */}
        <div className="services-page-header">
          <h1>My Services</h1>
          <p className="text-muted">
            I build web and mobile applications that solve real problems. 
            Every project is an opportunity to learn and create something meaningful.
          </p>
          
          {/* Add Service Button */}
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            + Add New Service
          </button>
        </div>

        {/* Error Message */}
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

        {/* Service Form Modal */}
        {showForm && (
          <div className="modal-overlay active">
            <div className="modal-content">
              <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              
              <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
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
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Features 
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Responsive design, Full-stack development, API integration"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/images/service.jpg or https://..."
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
                    {editingService ? 'Update Service' : 'Add Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="services-grid-page">
          {services.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No services yet. Click "Add New Service" to get started!
            </p>
          ) : (
            services.map((service) => (
              <article key={service.id} className="service-card-full">
                {/* Service Image */}
                <div className="service-card-image">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.title} service illustration`}
                    />
                  ) : (
                    <div 
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        fontSize: '3rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {service.title.charAt(0)}
                    </div>
                  )}
                  <div className="service-image-overlay"></div>
                </div>

                {/* Service Content */}
                <div className="service-card-content">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <ul className="service-features">
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          {/* Checkmark Icon */}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Edit and Delete Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button
                      onClick={() => handleEdit(service)}
                      className="btn btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="btn"
                      style={{ 
                        background: '#ef4444',
                        color: 'white'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Process Section */}
        <div className="process-section">
          <div className="process-header">
            <h2>My Process</h2>
            <p className="text-muted">My approach to developing software projects</p>
          </div>

          {/* Process Steps */}
          <div className="process-steps">
            {processSteps.map((step) => (
              <div key={step.id} className="process-step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="services-cta">
          <h2>Ready to Start Your Project?</h2>
          <p className="text-muted">
            Whether you need a web application, mobile app, or custom solution, 
            let's discuss how I can help bring your project to life.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Me
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services