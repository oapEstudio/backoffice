import { useState } from 'react'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { CustomGrid } from '../../../../components/ui/grid/CustomGrid';
import { CustomFab } from '../../../../components/ui/fab/CustomFab';
import { AddActionIcon, EyeIcon, GroupActionIcon } from '../../../../components/ui/icons';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import { DynamicPage, type IDynamicPageProps,  } from '../../shared/components/dynamic-page/DynamicPage';
import type { ISectionPage } from './components/section-page/SectionPage';
import { ModalAddElement, type IModalAddElementFormValues } from './components/modal-add-element/ModalAddElement';
import { CustomStack } from '../../../../components/ui/stack/Stack';
import { KEY_STORAGE_PROPS_DYNAMIC_PAGE } from '../../shared/constants/constants';
import { useHref, useNavigate } from 'react-router-dom';
import { PREVIEW_DYNAMIC_PAGE } from '../../../../router/routes';
import { serializeSections } from '../../shared/utils/dynamicpage-serialize';
import { saveDynamicPageToStorage } from '../../shared/storage/dp-save';
import { resetDynamicPageStorage } from '../../shared/storage/dp-reset';
import BlankCard from '../../../../components/ui/card/blank';
import { colors } from '../../../../common/colors';


export const NewDynamicPagesPage = () => {

  const [pagesProps, setPagesProps] = useState<ISectionPage[]>([]);
  const [openAddElement, setOpenAddElement] = useState<boolean>(false);
  const [sectionID, setSectionID] = useState<number>();    
  const navigate = useNavigate();
  const hrefDynamicPage = useHref(PREVIEW_DYNAMIC_PAGE.name); 
    

  const handleDeleteSection = (sectionId: number) =>{

     setPagesProps((previous)=>previous.filter(s=>s.id!==sectionId));
  }

  const handleDeleteElement = (elementId: number) =>{

     setPagesProps(prev =>
        prev.map(sec => ({
          ...sec,
          elements: sec.elements.filter(el => el.id !== elementId),
        }))
      );
  }

  const handleCancelAddModal = ()=>{
    setOpenAddElement(false);
  }
  const handleAddElement = (id: number) =>{
      
      setSectionID(id);
      setOpenAddElement(true);
     
  }

  const newElement = (element: IModalAddElementFormValues)=>{
    
     setPagesProps(prev =>
        prev.map(sec =>
          sec.id === sectionID
              ? {
                ...sec,
                elements: [
                  ...sec.elements,
                  { id: Date.now() ,align: element.align, label: element.label, type: element.type, file: element.file, height: element.height }, 
                ],
              }
            : sec
        )
      );
      setOpenAddElement(false);  
  }
  const handleAddSection = ()=>{

    setPagesProps((previos)=>([
                ...previos,
                {
                    elements: [],
                    id: previos.length + 1,
                    order: previos.length +1
                }
    ]));
  }

  const openNewPreview = () => window.open(hrefDynamicPage, '_blank', 'noopener,noreferrer');
  
  const handlePreview = async ()=>{

    await resetDynamicPageStorage();
    await saveDynamicPageToStorage(pagesProps);
   
    

    openNewPreview();
 
  }

  return (
     <ContainerPage
          description="NewDynamicPage"
          title="Construcción de página dinámica"
        >
            <CustomGrid container sx={{minHeight: 500, width: '100%' }}>
                <CustomGrid size={2}  justifyContent={'center'} alignContent={'flex-start'}>
                      <CustomStack spacing={5} direction='column'  sx={{borderBottomRightRadius: '10px', borderTopRightRadius: '10px', borderRightStyle: 'solid', borderRightWidth: '1rem',borderRightColor: colors.palette.primary.main, padding: '1rem',  marginTop: 10, position: 'fixed'}}>
                              <CustomBox>
                                  <CustomFab variant='extended' onClick={handleAddSection}>
                                      <AddActionIcon  />
                                      Añadir sección
                                  </CustomFab>
                              </CustomBox>                             
                              <CustomBox >
                                  <CustomFab  variant='extended' onClick={handlePreview}>
                                      <GroupActionIcon  />
                                      Agregar perfiles
                                  </CustomFab>
                              </CustomBox>
                               <CustomBox >
                                  <CustomFab variant='extended' onClick={handlePreview}>
                                      <EyeIcon  />
                                      Previsualización
                                  </CustomFab>
                              </CustomBox>
                      </CustomStack>                    
                </CustomGrid>
                <CustomGrid size={10} sx={{px: '1rem'}}>
                   <ModalAddElement 
                        open={openAddElement} 
                        onClose={()=>setOpenAddElement(false)} 
                        onCancel={handleCancelAddModal} 
                        onOk={(element)=>{newElement(element)}} />
                   <BlankCard elevation={20}>
                      <DynamicPage 
                          isMenu={true}
                          sections={pagesProps}
                          handleDeleteSections={handleDeleteSection}
                          handleAddElement={handleAddElement} 
                          handleDeleteElement={handleDeleteElement}

                          isEdit={true} 
                      />
                   </BlankCard>
                </CustomGrid>
            </CustomGrid>
    </ContainerPage>
  )
}
