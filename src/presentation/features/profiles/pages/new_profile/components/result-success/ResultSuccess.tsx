import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import SuccessSVG from './Success.svg';
import H5 from '../../../../../../components/ui/H5/H5';
import Typography from '@mui/material/Typography';


interface IResultSucess{
    perfil: string;
}
export const ResultSuccess: React.FC<IResultSucess> = ({perfil}) => {
  return (
    <CustomStack sx={{alignItems: 'center', width: '100%'}} spacing={2}>
        <img src={SuccessSVG} alt="" width={105} height={105}/>
        <>
            <SuccessMessage text='El perfil'/>
            <SuccessMessage color= "#007F49" text={`"${perfil}"`}/>
            <SuccessMessage text='Ha sido creado correctamente'/>
        </>
    </CustomStack>
  )
}

export function SuccessMessage({ text, color }: { text: string, color?:string }) {
  return (
    <Typography
      sx={{
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: '20px',
        lineHeight: '100%',
        letterSpacing: '0px',
        textAlign: 'center',
        color: color,
        margin: "0.5%"
      }}
    >
      {text}
    </Typography>
  )
}
