import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import WtiApp from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WtiApp />
  </StrictMode>,
)
