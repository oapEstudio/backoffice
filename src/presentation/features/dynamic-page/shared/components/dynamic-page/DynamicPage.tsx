import React from 'react'
import { CustomGrid } from '../../../../../components/ui/grid/CustomGrid'
import { CustomBox } from '../../../../../components/ui/box/CustomBox'
import { colors } from '../../../../../common/colors'
import { CustomStack } from '../../../../../components/ui/stack/Stack'


interface IElement{
    text: string;
}
interface ISection{
    order: number;
    elements: IElement[]; 

}
export interface IDynamicPageProps{
    isMenu: boolean;
    sections: ISection[];
}

export const DynamicPage: React.FC<IDynamicPageProps> = ({isMenu,sections}) => {
  return (
    <>
      <CustomGrid  container size={2} sx={{backgroundColor: colors.palette.primary.main}}>
          <CustomBox sx={{margin: 2, width: '100%'}}>
              <p>sizebar</p>
          </CustomBox>
      </CustomGrid>
      <CustomGrid container size={isMenu? 10 : 12} sx={{justifyContent: 'center', backgroundColor: colors.palette.primary.generalBackgroundTwo}}>
          <CustomStack direction='column' spacing={2} >
               
                 {
                            sections.length>0? sections.map(section=>{
                            
                                return  <CustomBox sx={{ flexGrow: 1 }}>
                                                <CustomGrid container spacing={1}>
                                                    {section.elements.length>0? section.elements.map((element,index)=>{
                                                        return <CustomGrid  sx={{backgroundColor: 'white'}} 
                                                                            size={section.elements.length>6? 12 : (12/ section.elements.length) } >
                                                                    <p>{element.text} posicion({index}) </p>
                                                              </CustomGrid>
                                                    }): <></>}
                                                </CustomGrid>
                                        </CustomBox>  

                            }): <></>
                }                   
                          
          </CustomStack>
      </CustomGrid>
    </>
  )
}
