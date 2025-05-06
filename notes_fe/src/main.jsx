import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import RouterApp from './routes/RouterApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
