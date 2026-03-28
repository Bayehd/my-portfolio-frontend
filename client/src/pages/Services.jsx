import { Link } from 'react-router-dom'
import '../styles/services.css'

//Services data array containing all information about my service
const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building responsive and functional web applications using modern technologies. From service management systems to interactive dashboards.',
    image: '/images/webdev.jpg',
    features: [
      'Responsive design for all devices',
      'Full-stack development (React, Next.js, Node.js)',
      'Database integration (MongoDB, Firebase)',
      'Real-time features and notifications',
      'API development and integration',
    ],
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Creating cross-platform mobile applications using React Native that work seamlessly on both iOS and Android platforms.',
    image: '/images/mobile app.jpg',
    features: [
      'Cross-platform development (iOS & Android)',
      'Real-time synchronization',
      'Push notifications',
      'GPS and location services',
      'Offline functionality',
    ],
  },
  {
    id: 3,
    title: 'Full-Stack Development',
    description: 'End-to-end application development from database design to user interface. Building complete solutions that solve real-world problems.',
    image: '/images/full-stack.jpg',
    features: [
      'Frontend & backend development',
      'Database design and management',
      'Authentication and security',
      'Cloud deployment (Firebase, Vercel)',
      'System architecture',
    ],
  },
  {
    id: 4,
    title: 'Custom Software Solutions',
    description: 'Developing tailored software applications to address specific business needs and streamline operations.',
    image: '/images/softwaresolutions.jpg',
    features: [
      'Service desk and ticketing systems',
      'Management information systems',
      'Automation tools',
      'Third-party API integration',
      'Custom dashboards and reporting',
    ],
  },
]

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

// ServicesPage Component
function Services() {
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
        </div>

        {/* Services Grid */}
        <div className="services-grid-page">
          {services.map((service) => (
            <article key={service.id} className="service-card-full">
              {/* Service Image */}
              <div className="service-card-image">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={`${service.title} service illustration`}
                />
                <div className="service-image-overlay"></div>
              </div>

              {/* Service Content */}
              <div className="service-card-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>

                {/* Features List */}
                <ul className="service-features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      {/* Checkmark Icon */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
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
