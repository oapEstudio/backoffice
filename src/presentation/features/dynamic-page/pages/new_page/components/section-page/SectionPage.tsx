import React from 'react'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import BlankCard from '../../../../../../components/ui/card/blank';
import { EmptySection } from '../empty-section/EmptySection';
import { ToolbarSection } from '../toolbar-section/ToolbarSection';
import { ElementDynamicPage, type IElementDynamicPage } from '../element-dynamic-page/ElementDynamicPage';


export interface ISectionPage{
    order: number;
    elements: IElementDynamicPage[]; 
    id: number;
}

export interface ISectionPageProps{
    section: ISectionPage;
    isEdit: boolean;
    handleDeleteSections: (id: number) => void;
    handleAddElement: (id: number) => void;
    handleDeleteElement: (id: number) => void;
}

export const SectionPage: React.FC<ISectionPageProps> = ({section, handleAddElement,handleDeleteSections,handleDeleteElement, isEdit}) => {


    if(section.elements.length === 0) return <CustomBox sx={{ px: 2, position: 'relative' }}>
                                                <ToolbarSection 
                                                    id={section.id} 
                                                    isEdit={isEdit} 
                                                    handleDeleteSections={handleDeleteSections} 
                                                    handleAddElements={handleAddElement} />
                                                <EmptySection />
                                             </CustomBox>


    if(section.elements.some(x=>x.type===1)) return <CustomBox>
                                                        <CustomGrid size={12}>
                                                            <CustomBox>                                                                           
                                                                    <img width={'100%'} height={200} src={URL.createObjectURL(section.elements[0].img)} /> 
                                                            </CustomBox> 
                                                        </CustomGrid>
                                                    </CustomBox>;
                                                    

  return <CustomBox sx={{ px: 2, position: 'relative' }} >
                                              <ToolbarSection 
                                                    id={section.id} 
                                                    isEdit={isEdit} 
                                                    handleDeleteSections={handleDeleteSections} 
                                                    handleAddElements={handleAddElement} />

                                              <BlankCard>
                                                   <CustomGrid container spacing={1}>
                                                         {
                                                            section.elements.map((element,index)=>{

                                                                const size = 12 / section.elements.length;

                                                                 return <ElementDynamicPage 
                                                                            handleDeleteElement={handleDeleteElement}
                                                                            size={size} 
                                                                            element={element}
                                                                            sectionId={section.id}
                                                                            key={'element_'+index}                                                                            
                                                                        />;
                                                            }) 
                                                         }
                                                  </CustomGrid>
                                            </BlankCard>
                                       </CustomBox> 
  
}
