import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { CustomGrid } from '../../../../components/ui/grid/CustomGrid';

import { DynamicPage } from '../../shared/components/dynamic-page/DynamicPage';

import { ModalAddElement } from './components/modal-add-element/ModalAddElement';
import BlankCard from '../../../../components/ui/card/blank';

import { ModalAddMenu } from './components/modal-add-menu/ModalAddMenu';
import { ModalAddSection } from './components/modal-add-section/ModalAddSection';
import { PanelNewPage } from './components/panel-new-page/PanelNewPage';
import { ModalSave } from './components/modal-save/ModalSave';
import { useNewDynamicPage } from './hooks/useNewDynamicPage';
import Loading from '../../../../components/ui/loading';


export const NewDynamicPagesPage = () => {

  const { setOpenAddSection,
    handlePreview,
    hasMenu,
    setHasMenu,
    handleSave,
    openAddElement,
    setOpenAddElement,
    handleCancelAddModal,
    newElement,
    openAddItemMenu,
    setOpenAddItemMenu,
    pagesProps,
    handleDeleteSection,
    handleAddItemMenu,
    handleAddElement,
    handleDeleteElement,
    openAddSection,
    searchingById,
    handleAddSection,
    openSave,
    initFormSave,
    creating,
    updating,
    save,
    update,
    isEdit,
    setOpenSave} = useNewDynamicPage();
 


  return (
     <ContainerPage
          description="NewDynamicPage"
          title="Construcción de página dinámica"
        >
            <CustomGrid container sx={{minHeight: 500, width: '100%' }}>
                <CustomGrid size={2}  justifyContent={'center'} alignContent={'flex-start'}>
                     <PanelNewPage 
                          setOpenAddSection={setOpenAddSection} 
                          handlePreview={handlePreview} 
                          hasMenu={hasMenu} 
                          setHasMenu={setHasMenu}  
                          handleSave={handleSave}                   
                      />                   
                </CustomGrid>
                <CustomGrid size={10} sx={{px: '1rem'}}>
                   <ModalAddElement 
                        open={openAddElement} 
                        onClose={()=>setOpenAddElement(false)} 
                        onCancel={handleCancelAddModal} 
                        onOk={(element)=>{newElement(element)}} 
                    />
                  <ModalAddMenu 
                      open={openAddItemMenu} 
                      onClose={()=>setOpenAddItemMenu(false)} 
                      onCancel={handleCancelAddModal} 
                      onOk={(element)=>{newElement(element)}} 
                  />  
                   <ModalAddSection 
                      open={openAddSection} 
                      onClose={()=>setOpenAddSection(false)} 
                      onCancel={handleCancelAddModal} 
                      onOk={(element)=>{handleAddSection(element.backgroundColor,element.backgroundImage)}} 
                  />   
                  <ModalSave 
                      isEdit={isEdit}
                      init={initFormSave}
                      saving={creating || updating}
                      open={openSave} 
                      onClose={()=>setOpenSave(false)} 
                      onCancel={handleCancelAddModal} onOk={isEdit?update:save} />  

                  {
                    searchingById? <center style={{marginTop: '10rem'}}> <Loading /> </center> :
                     <BlankCard elevation={20}>
                      <DynamicPage 
                          isMenu={hasMenu}
                          sections={pagesProps}
                          handleDeleteSections={handleDeleteSection}
                          handleAddMenu={handleAddItemMenu}
                          handleAddElement={handleAddElement} 
                          handleDeleteElement={handleDeleteElement}

                          isEdit={true} 
                      />
                   </BlankCard>
                  }  
                  
                </CustomGrid>
            </CustomGrid>
    </ContainerPage>
  )
}
