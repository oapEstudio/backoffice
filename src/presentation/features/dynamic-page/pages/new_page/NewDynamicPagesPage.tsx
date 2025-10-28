import { useState } from 'react'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { CustomGrid } from '../../../../components/ui/grid/CustomGrid';
import { CustomFab } from '../../../../components/ui/fab/CustomFab';
import { AddActionIcon } from '../../../../components/ui/icons';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import { DynamicPage, type IDynamicPageProps,  } from '../../shared/components/dynamic-page/DynamicPage';
import type { ISectionPage } from './components/section-page/SectionPage';
import { ModalAddElement, type IModalAddElementFormValues } from './components/modal-add-element/ModalAddElement';


export const NewDynamicPagesPage = () => {

  const [pagesProps, setPagesProps] = useState<ISectionPage[]>([]);
  const [openAddElement, setOpenAddElement] = useState<boolean>(false);
  const [sectionID, setSectionID] = useState<number>();

    
  
  const handleDeleteSection = (id: number) =>{

     setPagesProps((previous)=>previous.filter(s=>s.id!==id));
  }

  const handleDeleteElement = (id: number) =>{

     //setPagesProps((previous)=>previous.filter(s=>s.id!==id));
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
                  { text: 'pruebaadd', type: element.type, img: element.img }, 
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


  return (
     <ContainerPage
          description="NewDynamicPage"
          title="Construcción de página dinámica"
        >
            <CustomGrid container sx={{minHeight: 500, width: '100%' }}>
                <CustomGrid size={2}  justifyContent={'center'} alignContent={'flex-start'}>
                        <CustomBox sx={{marginTop: 10}}>
                            <CustomFab variant='extended' onClick={handleAddSection}>
                                <AddActionIcon  />
                                Añadir sección
                            </CustomFab>
                        </CustomBox>
                </CustomGrid>
                <CustomGrid size={10}>
                   <ModalAddElement 
                        open={openAddElement} 
                        onClose={()=>setOpenAddElement(false)} 
                        onCancel={handleCancelAddModal} 
                        onOk={(element)=>{newElement(element)}} />
                    <DynamicPage 
                        isMenu={true}
                        sections={pagesProps}
                        handleDeleteSections={handleDeleteSection}
                        handleAddElement={handleAddElement} 
                        handleDeleteElement={handleDeleteElement}

                        isEdit={true} 
                    />
                </CustomGrid>
            </CustomGrid>
    </ContainerPage>
  )
}
