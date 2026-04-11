import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'  
import Footer from './components/Footer'  
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import References from './pages/References' 
import Contact from './pages/Contact'
import Users from './pages/Users'
import Login from './pages/Login'           
import Signup from './pages/Signup'         
import Dashboard from './pages/Dashboard' 
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
          <Route path="/" element={<Login />} />              
          <Route path="/home" element={<Home />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/references" element={<References />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />         
          <Route path="/signup" element={<Signup />} />       
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </main>
      
      {/* Footer - displayed on all pages */}
      <Footer />
    </div>
  )
}

export default App