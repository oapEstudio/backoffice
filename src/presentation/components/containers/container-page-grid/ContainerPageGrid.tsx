import React, { type JSX } from 'react'
import Container from '../../ui/container'
import BarBackOffice from '../../widgets/bar-backoffice/BarBackOffice';
import { styled } from '@mui/material/styles';
import Loading from '../../ui/loading';
import { CustomStack } from '../../ui/stack/Stack';
import { colors } from '../../../common/colors';
import CustomDivider from '../../ui/divider';
import { LoadingContainer } from '../../widgets/loading-container/LoadingContainer';
import { ToolbarTableCount } from '../../widgets/toolbar-table-count/ToolbarTableCount';
import { useAuth } from '../../../contexts/AuthContext';

export interface IContainerPageProp{
    children: any,
    description: string,
    titleSEO?: string,
    title: string,
    count: number,
    loading?: boolean,
    filter?: JSX.Element
}


const WrapperContainerPage = styled('div')(({ theme }) => ({
  marginTop: '5%',
  paddingLeft: '3%',
  paddingRight: '3%',
}));





export const ContainerPageGrid: React.FC<IContainerPageProp> = ({children,titleSEO,description,title,count,loading= false,filter}) => {
    
  const { user, getUserName, logout } = useAuth();

  return (
   <Container description={description} title={titleSEO}>     
          <BarBackOffice user={getUserName() ?? '(sin nombre)'}  exitApp={()=>{        
                logout()
              }} title={title}/>
          <WrapperContainerPage>
             {            
              <>
                {loading && (<LoadingContainer />)}              
                <ToolbarTableCount count={count} actions={filter} />                              
                {children}
              </>
             }
         </WrapperContainerPage>                       
   </Container>
  )
}
