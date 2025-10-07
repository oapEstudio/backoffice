import React from 'react'
import Container from '../../ui/container'
import BarBackOffice from '../../widgets/bar-backoffice/BarBackOffice';
import { styled } from '@mui/material/styles';
import { LoadingContainer } from '../../widgets/loading-container/LoadingContainer';
import { useAuth } from '../../../contexts/AuthContext';

export interface IContainerPageProp{
    children: any,
    description: string,
    title: string,
    titleSEO?: string,
    loading?: boolean
}


const WrapperContainerPage = styled('div')(({ theme }) => ({
  paddingLeft: '3%',
  paddingRight: '3%'
}));
export const ContainerPage: React.FC<IContainerPageProp> = ({children,description,title,titleSEO,loading=false}) => {

  const { user, getUserName, logout } = useAuth();
  
  return (
    <>
        {loading && (<LoadingContainer />)}  
        <Container  description={description} title={titleSEO}>          
              <BarBackOffice user={getUserName() ?? '(sin nombre)'} title={title} exitApp={()=>{
                logout()
              }}/>            
              <WrapperContainerPage >
                {children}
            </WrapperContainerPage>                       
        </Container> 
    </>
   
  )
}
