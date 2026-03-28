import '../styles/about.css'

// My skills array 
const skills = [
  'Java',
  'JavaScript',
  'Python',
  'C#',
  'React',
  'React Native',
  'Node.js',
  'HTML5',
  'CSS3',
  'SQL',
  'MongoDB',
  'Firebase',
  'Git',
  'REST APIs',
]


// My experience and education data

const timelineData = [
  {
    id: 1,
    date: '2024 November - 2025 July',
    title: 'Software Engineer - Systems & Operations',
    company: 'West Africa Gas Pipeline',
    description: '• Designed and built full-stack web and mobile applications using Node.js, React, and MongoDB. •Optimized  web performance: code optimization, and performance monitoring.',
  },
  {
    id: 2,
    date: '2022 November - 2022 December',
    title: 'Software Engineer Intern - Product Support & Quality  ',
    company: 'West Africa Gas Pipeline',
    description: '•	Provided technical support to 150+ users, managing issues from diagnosis through resolution. •Executed hardware deployment and configuration across 15+ installations.',
  },
  {
    id: 3,
    date: '2020 September - 2024 November',
    title: 'Bachelor of Science in Computer Science',
    company: 'Kwame Nkrumah University of Science and Technology',
    description: 'Graduated with Second Class. Specialized in software engineering and web technologies.',
  },
]

// AboutPage Component
function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Page Header */}
        <div className="about-header">
          <h1>About Me</h1>
          <p className="text-muted">Learn more about my journey, skills, and what drives me as a developer</p>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          {/* Profile Image */}
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <div className="profile-image-border"></div>
              <img
                src="/images/profile.jpg"
                alt="BA - Full-Stack Developer"
                className="profile-image"
              />
            </div>
          </div>

          {/* about me  */}
          <div className="profile-info">
            <h2>Benonia Didi Owusu Ayeh</h2>
            <p className="profile-title">Full-Stack Developer</p>

            {/* Quick Info Badges */}
            <div className="quick-info">
              <span className="info-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Toronto, Canada
              </span>
              <span className="info-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                benoniaowusu@gmail.com
              </span>
              <span className="info-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                1 Year Experience
              </span>
            </div>

            {/* My background */}
            <p className="bio-text">
            I am a passionate full-stack developer with hands-on experience building complete web 
            and mobile applications. My journey in software development began with my Bachelor's 
            degree in Computer Science, where I discovered my love for creating solutions that 
            make a real impact.
            </p>
            <p className="bio-text">
              As a Software Engineering Technology student at Centennial College, I'm passionate about 
              building practical applications that solve real problems. I work with React, Node.js, and 
              React Native, and I've built projects ranging from service management systems to mobile 
              apps. I'm constantly learning, whether through coursework, personal projects, or hackathons. 
              My goal is to keep growing as a developer while creating software that actually helps people.
            </p>

            {/* link ti my resume */}
            <div className="resume-btn">
              <a
                href="https://drive.google.com/file/d/11qDRqt-qw3Z98rhb6ZriUCzrxYOu7hBf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        {/*  My Skills */}
        <div className="skills-section">
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* My Experience & Education Timeline */}
        <div className="timeline-section">
          <h3>Experience & Education</h3>
          <div className="timeline">
            {timelineData.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <p className="timeline-date">{item.date}</p>
                <h4 className="timeline-title">{item.title}</h4>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
