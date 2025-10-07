
import IconButton from '@mui/material/IconButton';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers'
import React from 'react'

interface IArrowsSlideProps{
    goPrev: ()=> void;
    goNext: ()=> void;
    arrowsAtEdges: boolean;
    
}
export const ArrowsSlide: React.FC<IArrowsSlideProps> = ({goPrev,goNext,arrowsAtEdges}) => {
  return (
    <>
      <IconButton
                onClick={goPrev}
                aria-label="Anterior"                
                sx={{
                  position: { xs: 'absolute', md: arrowsAtEdges ? 'absolute' : 'absolute' },
                  left: { xs: 12, md: arrowsAtEdges ? 16 : 12 },
                  top: '50%',
                  fontSize: '2.5rem',
                  transform: 'translateY(-50%)',
                  color: 'primary.main',
                  zIndex: 1, 
                }}
              >
               <ArrowLeftIcon style={{width: '3rem',height: '3rem'}}/>
              </IconButton>
    
              <IconButton
                onClick={goNext}
                aria-label="Siguiente"
                sx={{
                  position: { xs: 'absolute', md: arrowsAtEdges ? 'absolute' : 'absolute' },
                  right: { xs: 12, md: arrowsAtEdges ? 16 : 12 },
                  top: '50%',
                  fontSize: '2.5rem',
                  transform: 'translateY(-50%)',
                  color: 'primary.main',
                  zIndex: 1,
                }}
              >
                <ArrowRightIcon style={{width: '3rem',height: '3rem'}}/>
              </IconButton>
    
    </>
  )
}
