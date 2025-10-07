import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BackOfficeApp } from './BackOfficeApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BackOfficeApp/>
  </StrictMode>,
)
