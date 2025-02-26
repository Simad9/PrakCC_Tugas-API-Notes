import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import NotesApp from './pages/Notes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesApp />
  </StrictMode>,
)
