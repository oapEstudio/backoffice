import React from 'react'
import { CustomGrid } from '../../../../../components/ui/grid/CustomGrid'
import { CustomBox } from '../../../../../components/ui/box/CustomBox'
import { colors } from '../../../../../common/colors'
import { CustomStack } from '../../../../../components/ui/stack/Stack'
import { SectionsDynamicPage } from '../../../pages/new_page/components/sections-page/SectionsDynamicPage'
import type { ISectionPage } from '../../../pages/new_page/components/section-page/SectionPage'


export interface IDynamicPageProps{
    isMenu: boolean;
    isEdit: boolean;
    sections: ISectionPage[];
    handleDeleteSections: (id: number) => void;
    handleAddElement: (id: number) => void;
    handleDeleteElement: (id: number) => void;
}

export const DynamicPage: React.FC<IDynamicPageProps> = ({isEdit = true,isMenu,sections, handleDeleteSections, handleAddElement, handleDeleteElement}) => {


  return (
   <CustomGrid container sx={{minHeight: 500}}>
        <CustomGrid  container size={2} sx={{backgroundColor: colors.palette.primary.main}}>
            <CustomBox sx={{margin: 2, width: '100%'}}>
                <p>sizebar</p>
            </CustomBox>
        </CustomGrid>
        <CustomGrid container size={isMenu? 10 : 12} sx={{ backgroundColor: colors.palette.primary.generalBackgroundTwo}}>
            <CustomStack direction='column' spacing={2} sx={{width: '100%'}}>
                
                    {
                        sections.length >0 ? 
                                            <SectionsDynamicPage 
                                                sections={sections} 
                                                isEdit={isEdit} 
                                                handleDeleteSections={handleDeleteSections} 
                                                handleAddElement={handleAddElement} 
                                                handleDeleteElement={handleDeleteElement} /> : 
                                            <></>
                    }                   
                            
            </CustomStack>
        </CustomGrid>
   </CustomGrid>
  )
}
