import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/ui/footer/Footer'

export const BlankBackOffice: React.FC = () => {
  return (
      <>
        <Outlet />
        <Footer />
      </>
      
  )
}
