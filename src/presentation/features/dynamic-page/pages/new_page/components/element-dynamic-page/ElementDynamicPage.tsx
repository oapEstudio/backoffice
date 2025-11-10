import { size } from 'lodash';
import React from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab';
import { DeleteActionIcon } from '../../../../../../components/ui/icons';
import { TitlePages } from '../../../../../../components/widgets/title-page/TitlePages';
import { RichTextReadOnly } from 'mui-tiptap';
import StarterKit from "@tiptap/starter-kit";

import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { VideoPlayer } from '../step-two-dynamic-page/components/VideoFields';

export enum eTypeElement{
    BACKGROUND_IMAGE = 1,
    TITLE = 2,
    PARAGRAPH = 3,
    FILE = 4,
    IMG = 5,
    VIDEO = 6,
    ITEM_MENU = 7
}

export interface IElementDynamicPage{
    id: number;  
    label: string;
    type: eTypeElement;
    file: File;
    height: number;
    align: string;
    link: string;
}

export interface IElementDynamicPageProps{
    isEdit: boolean;
    element: IElementDynamicPage,
    size: number;
    sectionId: number;
    handleDeleteElement?: (id: number)=>void;
}
export const ElementDynamicPage: React.FC<IElementDynamicPageProps> = ({size, element,sectionId, handleDeleteElement, isEdit}) => {
  return <CustomGrid  size={ size } >
                 <>{handleDeleteElement && <CustomFab style={{width: '30px' , height: '30px'}} sx={{position: 'absolute'}} onClick={()=>{handleDeleteElement(element.id)}}>
                                                <DeleteActionIcon />
                                            </CustomFab>  
                   }                 
                 </>
                <CustomBox sx={{border: isEdit? '0.2rem dashed #9E9E9E' : 'none', minHeight: 100, alignContent: 'center'}}>                                                                                         
                    {element.type === eTypeElement.BACKGROUND_IMAGE?
                                    <img width={'100%'} height={element.height} src={URL.createObjectURL(element.file)} /> :
                                    <></>}
                    {element.type === eTypeElement.TITLE?
                                    <TitlePages title={element.label} style={{padding: '0px 2rem', textAlign: element.align }} /> :
                                    <></>}                                                                            
                    {element.type === eTypeElement.PARAGRAPH?
                                    <CustomBox sx={{padding: '2rem'}}>
                                        <RichTextReadOnly content={element.label} extensions={[StarterKit,TextStyleKit, TextAlign.configure({
                                                types: ['heading', 'paragraph']                                               
                                              })]} />
                                    </CustomBox> :
                                    <></>}   
                   {element.type === eTypeElement.FILE?
                                    <a href={URL.createObjectURL(element.file)} target='_blank'>{element.file.name}</a> :
                                    <></>} 
                    {element.type === eTypeElement.IMG?
                                    <img 
                                        src={URL.createObjectURL(element.file)} 
                                        width={'100%'} 
                                        height={element.height>0?element.height : 50}/> :
                                    <></>} 
                    {element.type === eTypeElement.VIDEO?
                                    <VideoPlayer 
                                        file={element.file} 
                                        height={element.height} /> :
                                    <></>}                                                                                                                                                   
                </CustomBox>                                                                            
        </CustomGrid>
}
