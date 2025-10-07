import React from 'react'
import CustomDivider from '../../../../../../components/ui/divider'
import H5 from '../../../../../../components/ui/H5/H5'

export interface ITitleStep{
    title: string,
    subtitle: string
}
export const TitleStep: React.FC<ITitleStep> = ({title,subtitle}) => {
  return (
    <>
        <H5 style={{marginBottom: '1%'}}>{title}</H5>
            
        <span>{subtitle}</span>
            
        <CustomDivider />
    </>
  )
}
