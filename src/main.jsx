import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoadImageComponent } from './pages/components/BackgroundSelector.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadImageComponent />
    <App />
  </StrictMode>,
)
