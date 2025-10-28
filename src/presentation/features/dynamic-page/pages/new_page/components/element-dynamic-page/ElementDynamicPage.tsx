import { size } from 'lodash';
import React from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab';
import { DeleteActionIcon } from '../../../../../../components/ui/icons';

export enum eTypeElement{
    BACKGROUND_IMAGE = 1,
    IMAGE = 2
}

export interface IElementDynamicPage{
    text: string;
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
                <CustomBox>                                            
                <CustomFab onClick={()=>{handleDeleteElement(sectionId)}}>
                    <DeleteActionIcon />
                </CustomFab>                               
                    {element.type === eTypeElement.BACKGROUND_IMAGE?
                                    <img src={URL.createObjectURL(element.img)} /> :
                                    <></>}                                                                            
                </CustomBox>                                                                            
        </CustomGrid>
}
