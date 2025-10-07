
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { CustomTabs } from '../../../../components/ui/tabs/CustomTabs'
import { styled } from '@mui/material/styles'

import { CustomStack } from '../../../../components/ui/stack/Stack'
import { CustomBox } from '../../../../components/ui/box/CustomBox'
import H5 from '../../../../components/ui/H5/H5'
import ProfileMultiSelect from '../../../../components/widgets/multiselect-profile/MultiSelectProfile'
import { arraysEqual } from '../../../../utils/arrayToEquals'
import H6 from '../../../../components/ui/H6/H6'
import { FUNTIONALITIES } from '../../../../router/routes'
import { TabsItemsMenu } from './components/tab-items-menu/TabsItemsMenu'
import { useState } from 'react'
import { TabsApplications } from './components/tabs-applications/TabsApplications'

const Container = styled('div')(({ theme }) => ({
  paddingTop: '2%'
}));

export const MenuesPage = () => {

  const [loadingContainer, setLoadingContainer] = useState(false);
  const [loadingItemMenu, setLoadingItemMenu] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);



  

  return (
    <ContainerPage loading={loadingContainer} description="MenuManagementPage" title={FUNTIONALITIES.title} titleSEO='Gestión de menu'>
      
      <Container>
          <CustomTabs   tabs={[{
                
                  id:0,
                  label: 'ÍTEMS DE MENÚ',
                  element: <TabsItemsMenu onLoadingChange={(loading)=>{
                                                                setLoadingItemMenu(loading);
                                                                setLoadingContainer((loadingItemMenu || loadingApplications));
                                                            }} 
                           /> 
                },{                
                  id: 1,
                  label: 'APLICACIONES DESTACADAS',
                  element: <TabsApplications  onLoadingChange={(loading)=>{
                                                                setLoadingApplications(loading);
                                                                setLoadingContainer((loadingItemMenu || loadingApplications));
                                                            }} 
                           />
                }]} 
          />   
      </Container>
         
    </ContainerPage>
    
  )
}
