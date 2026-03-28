import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'  
import Footer from './components/Footer'  
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Navigation bar - displayed on all pages */}
      <Navbar />
      
      {/* Main content area with route definitions */}
      <main className="main-content">
        <Routes>
          {/* Define routes for each page of the portfolio */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      {/* Footer - displayed on all pages */}
      <Footer />
    </div>
  )
}

export default App