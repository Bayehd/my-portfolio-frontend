import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // ← Changed from BrowserRouter
import App from './App'
import './styles/index.css'

// Get the root element from the DOM where React will mount
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouter enables client-side routing with hash-based URLs */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)