import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' // Ajusta la ruta si App está en otro lugar
import './css/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className='bg-gray-50 container mx-auto min-h-screen flex justify-center items-center'>
      <App />
    </main>
  </StrictMode>
)
