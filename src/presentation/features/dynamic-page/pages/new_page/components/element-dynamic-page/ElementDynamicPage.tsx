import { size } from 'lodash';
import React from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab';
import { DeleteActionIcon } from '../../../../../../components/ui/icons';
import { TitlePages } from '../../../../../../components/widgets/title-page/TitlePages';
import { CustomRichTextEditor } from '../../../../../../components/ui/rich-text-editor/CustomRichTextEditor';
import { RichTextReadOnly } from 'mui-tiptap';
import StarterKit from "@tiptap/starter-kit";
export enum eTypeElement{
    BACKGROUND_IMAGE = 1,
    TITLE = 2,
    PARAGRAPH = 3,
    FILE = 4,
    IMG = 5
}

export interface IElementDynamicPage{
    id: number;  
    label: string;
    type: eTypeElement;
    file: File;
    height: number;
    align: string;
}

export interface IElementDynamicPageProps{
    element: IElementDynamicPage,
    size: number;
    sectionId: number;
    handleDeleteElement: (id: number)=>void;
}
export const ElementDynamicPage: React.FC<IElementDynamicPageProps> = ({size, element,sectionId, handleDeleteElement}) => {
  return <CustomGrid  size={ size } >
                <CustomFab style={{width: '30px' , height: '30px'}} sx={{position: 'absolute'}} onClick={()=>{handleDeleteElement(element.id)}}>
                    <DeleteActionIcon />
                </CustomFab>  
                <CustomBox sx={{minHeight: 100, alignContent: 'center'}}>                                                                                         
                    {element.type === eTypeElement.BACKGROUND_IMAGE?
                                    <img src={URL.createObjectURL(element.file)} /> :
                                    <></>}
                    {element.type === eTypeElement.TITLE?
                                    <TitlePages title={element.label} style={{padding: '0px 2rem', textAlign: element.align }} /> :
                                    <></>}                                                                            
                    {element.type === eTypeElement.PARAGRAPH?
                                    <RichTextReadOnly content={element.label} extensions={[StarterKit]} /> :
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
                </CustomBox>                                                                            
        </CustomGrid>
}
