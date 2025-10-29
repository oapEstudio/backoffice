import { size } from 'lodash';
import React from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab';
import { DeleteActionIcon } from '../../../../../../components/ui/icons';
import { TitlePages } from '../../../../../../components/widgets/title-page/TitlePages';

export enum eTypeElement{
    BACKGROUND_IMAGE = 1,
    TITLE = 2
}

export interface IElementDynamicPage{
    label: string;
    type: eTypeElement;
    img: File;
}

export interface IElementDynamicPageProps{
    element: IElementDynamicPage,
    size: number;
    sectionId: number;
    handleDeleteElement: (id: number)=>void;
}
export const ElementDynamicPage: React.FC<IElementDynamicPageProps> = ({size, element,sectionId, handleDeleteElement}) => {
  return <CustomGrid  size={ size } >
                <CustomFab sx={{position: 'absolute'}} onClick={()=>{handleDeleteElement(sectionId)}}>
                    <DeleteActionIcon />
                </CustomFab>  
                <CustomBox sx={{minHeight: 100, alignContent: 'center'}}>                                                                                         
                    {element.type === eTypeElement.BACKGROUND_IMAGE?
                                    <img src={URL.createObjectURL(element.img)} /> :
                                    <></>}
                    {element.type === eTypeElement.TITLE?
                                    <TitlePages title={element.label} /> :
                                    <></>}                                                                            
                </CustomBox>                                                                            
        </CustomGrid>
}
