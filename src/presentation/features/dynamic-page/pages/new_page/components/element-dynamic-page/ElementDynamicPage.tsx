import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab';
import { DeleteActionIcon } from '../../../../../../components/ui/icons';
import { TitlePages } from '../../../../../../components/widgets/title-page/TitlePages';
import { FontSize, RichTextReadOnly } from 'mui-tiptap';
import StarterKit from "@tiptap/starter-kit";

import { Color, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { VideoPlayer } from '../step-two-dynamic-page/components/VideoFields';
import { CustomAccordion } from '../../../../../../components/ui/accordion/Accordion';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Underline } from '@tiptap/extension-underline';
import { CustomRichTextView } from '../../../../../../components/ui/rich-text-editor/CustomRichTextEditor';

export enum eTypeElement{
    BACKGROUND_IMAGE = 1,
    TITLE = 2,
    PARAGRAPH = 3,
    FILE = 4,
    IMG = 5,
    VIDEO = 6,
    ITEM_MENU = 7,
    ACCORDEON = 8
}

export interface IElementDynamicPage{
    id: number;  
    label: string;
    text: string;
    fontSize: string;
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
                <CustomBox sx={{height: '100%', border: isEdit? '0.2rem dashed #9E9E9E' : 'none', minHeight: 100, alignContent: 'center'}}>                                                                                         
                    {element.type === eTypeElement.BACKGROUND_IMAGE?
                                    <img width={'100%'} height={element.height} src={URL.createObjectURL(element.file)} /> :
                                    <></>}
                    {element.type === eTypeElement.TITLE?
                                    <TitlePages title={element.label} style={{fontSize: element.fontSize, padding: '0px 2rem', textAlign: element.align }} /> :
                                    <></>}                                                                            
                    {element.type === eTypeElement.PARAGRAPH?
                                    <CustomBox sx={{alignContent: 'center', padding: '2rem',lineHeight: 'normal'}}>
                                        <CustomRichTextView content={element.text} />
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

                     {element.type === eTypeElement.ACCORDEON?
                                    <CustomAccordion 
                                        title={element.label} 
                                        content={ 
                                               <CustomBox sx={{alignContent: 'center',padding: '2rem',lineHeight: 'normal'}}>
                                                    <CustomRichTextView content={element.text}/>
                                                </CustomBox>
                                             } 
                                      /> :<></>}                                                                                                                                                   
                </CustomBox>                                                                            
        </CustomGrid>
}
