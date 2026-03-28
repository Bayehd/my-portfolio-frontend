import { Link } from 'react-router-dom'
import '../styles/home.css'



function Home() {
  return (
    <div>
      {/* Hero Section - A  Welcome Message */}
      <section className="hero">
        <div className="hero-container">
          {/* Availability Status  */}
          <div className="availability-badge">
            <span className="availability-dot"></span>
            Open to work
          </div>

          {/* Main Heading with  my name */}
          <h1 className="hero-title">
            Hello, I'm <span className="highlight">Benonia Ayeh</span>
          </h1>

          {/* My professional title */}
          <p className="hero-subtitle"> A Full-Stack Developer</p>

          {/* Welcome Description */}
          <p className="hero-description">
          Welcome to my portfolio! Here you'll find an overview of my work as a software developer, 
          the services I provide, and my approach to creating thoughtful, user-focused applications. 
          Let's build something great together.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">
              Learn More About Me
              {/* Arrow Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="mission-section">
        <div className="mission-container">
          <h2 className="mission-title">My Mission</h2>
          <p className="mission-text">
          I believe great software should solve real problems and make life easier. My mission 
          is to tackle challenges both local and global through continuous learning and innovative 
          thinking. I'm committed to creating accessible, user-focused applications that transform 
          complex problems into simple, elegant solutions that truly help people.
          </p>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview">
        <div className="services-preview-container">
          <div className="services-header">
            <h2>What I Do</h2>
            <p className="text-muted">Explore my areas of expertise</p>
          </div>

          {/* Service Cards Grid */}
          <div className="services-grid">
            {/* Web Development Card */}
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3>Web Development</h3>
              <p>Building responsive, fast, and modern web applications using the latest technologies.</p>
            </div>

            {/* Mobile Apps Card */}
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3>Mobile Apps</h3>
              <p>Creating cross-platform mobile applications that deliver seamless user experiences.</p>
            </div>

            {/* Custom Software Card */}
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3>Custom Software & Automation</h3>
              <p>Developing tailored applications, databases, and automation systems designed specifically for your business requirements.</p>
            </div>
          </div>

          {/* Link to All Services */}
          <div className="services-link">
            <Link to="/services" className="link-arrow">
              View All Services
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Let's Build Something Amazing</h2>
          <p className="text-muted">Have a project in mind? I'd love to hear about it.</p>
          
          <div className="cta-links">
            <Link to="/projects" className="link-arrow">
              View My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <span className="cta-divider">|</span>
            <Link to="/contact" className="link-arrow">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
