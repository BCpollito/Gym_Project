import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className='container mx-auto min-h-screen flex justify-center items-center'>
      <App />
    </main>
  </StrictMode>,
)