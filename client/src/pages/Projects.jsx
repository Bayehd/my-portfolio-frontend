import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsAPI } from '../services/api'
import '../styles/projects.css'

// Projects Component with CRUD
function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role: '',
    outcome: '',
    technologies: '',
    liveUrl: '',
    githubUrl: ''
  })

  // Fetch projects from backend on component mount
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAll()
      if (response.data.success) {
        setProjects(response.data.data)
      }
      setError(null)
    } catch (err) {
      setError('Failed to load projects')
      console.error('Error fetching projects:', err)
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
      // Convert technologies string to array
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        completion: new Date() // Add completion date
      }

      if (editingProject) {
        // Update existing project
        await projectsAPI.update(editingProject.id, projectData)
      } else {
        // Create new project
        await projectsAPI.create(projectData)
      }

      // Reset form and refresh projects
      setShowForm(false)
      setEditingProject(null)
      setFormData({
        title: '',
        description: '',
        role: '',
        outcome: '',
        technologies: '',
        liveUrl: '',
        githubUrl: ''
      })
      fetchProjects()
    } catch (err) {
      console.error('Error saving project:', err)
      alert('Failed to save project. Please try again.')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      role: project.role || '',
      outcome: project.outcome || '',
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ') 
        : '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id)
        fetchProjects()
      } catch (err) {
        console.error('Error deleting project:', err)
        alert('Failed to delete project. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProject(null)
    setFormData({
      title: '',
      description: '',
      role: '',
      outcome: '',
      technologies: '',
      liveUrl: '',
      githubUrl: ''
    })
  }

  if (loading) {
    return (
      <div className="projects-page">
        <div className="projects-container">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="projects-page">
      <div className="projects-container">
        {/* Page Header */}
        <div className="projects-header">
          <h1>My Projects</h1>
          <p className="text-muted">A selection of projects I've worked on</p>
          
          {/* Add Project Button */}
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            + Add New Project
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

        {/* Project Form Modal */}
        {showForm && (
          <div className="modal-overlay active">
            <div className="modal-content">
              <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              
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
                    Role
                  </label>
                  <textarea
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    rows="3"
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
                    Outcome
                  </label>
                  <textarea
                    name="outcome"
                    value={formData.outcome}
                    onChange={handleInputChange}
                    rows="3"
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
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB"
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
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
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
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
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
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="projects-list">
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No projects yet. Click "Add New Project" to get started!
            </p>
          ) : (
            projects.map((project, index) => (
              <article
                key={project.id}
                className={`project ${index % 2 === 1 ? 'reverse' : ''}`}
              >
                {/* Project Image - Optional, can be added later */}
                <div className="project-image">
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {project.title.charAt(0)}
                  </div>
                  <div className="project-image-overlay"></div>
                </div>

                {/* Project Details */}
                <div className="project-details">
                  <h2>{project.title}</h2>

                  {/* Technology Badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="tech-badges">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="project-description">{project.description}</p>

                  {/* Role Section */}
                  {project.role && (
                    <div className="project-role">
                      <h3>My Role</h3>
                      <p>{project.role}</p>
                    </div>
                  )}

                  {/* Outcome Section */}
                  {project.outcome && (
                    <div className="project-outcome">
                      <h3>Outcome</h3>
                      <p>{project.outcome}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="project-actions">
                    {project.liveUrl && (
                      <a  
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        Source Code
                      </a>
                    )}
                    
                    {/* Edit and Delete Buttons */}
                    <button
                      onClick={() => handleEdit(project)}
                      className="btn btn-secondary"
                      style={{ marginLeft: 'auto' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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

        {/* GitHub Note */}
        <div className="github-note">
          <div className="github-note-card">
            <p>
              Want to see more?{' '}
              <a 
                href="https://github.com/Bayehd"
                target="_blank"
              >
                Check out my GitHub
              </a>{' '}
              for additional projects and contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects