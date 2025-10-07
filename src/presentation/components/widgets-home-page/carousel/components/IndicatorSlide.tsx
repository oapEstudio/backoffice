import React from 'react'
import { CustomBox } from '../../../ui/box/CustomBox';

interface IIndicatorSlideProps{
    key: number;
    index: number;
}
export const IndicatorSlide: React.FC<IIndicatorSlideProps> = ({key,index}) => {
  return (
   <CustomBox
              key={key}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: key === index ? 'primary.main' : 'rgba(255,255,255,0.8)',
                border: key === index ? '1px solid #fff' : '1px solid rgba(0,0,0,0.25)',
              }}
            />
  )
}
