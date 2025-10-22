import React from 'react'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { CustomGrid } from '../../../../components/ui/grid/CustomGrid';
import { CustomFab } from '../../../../components/ui/fab/CustomFab';
import { AddActionIcon } from '../../../../components/ui/icons';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import { ContentPage } from './components/content-page/ContentPage';

export const NewDynamicPagesPage = () => {
  return (
     <ContainerPage
          description="NewDynamicPage"
          title="Construcción de página dinámica"
        >
            <CustomGrid container sx={{minHeight: 500, width: '100%' }}>
                <CustomGrid size={2}  justifyContent={'center'} alignContent={'flex-start'}>
                        <CustomBox sx={{marginTop: 10}}>
                            <CustomFab variant='extended'>
                                <AddActionIcon />
                                Añadir sección
                            </CustomFab>
                        </CustomBox>
                </CustomGrid>
                <CustomGrid size={10}>
                    <ContentPage />
                </CustomGrid>
            </CustomGrid>
    </ContainerPage>
  )
}
