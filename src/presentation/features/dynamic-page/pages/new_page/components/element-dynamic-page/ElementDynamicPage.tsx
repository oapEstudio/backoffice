import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab';
import { DeleteActionIcon } from '../../../../../../components/ui/icons';
import { TitlePages } from '../../../../../../components/widgets/title-page/TitlePages';
import { VideoPlayer } from '../step-two-dynamic-page/components/VideoFields';
import { CustomAccordion } from '../../../../../../components/ui/accordion/Accordion';

import { CustomRichTextView } from '../../../../../../components/ui/rich-text-editor/CustomRichTextEditor';
import { DownloadAction } from '../../../../../../components/ui/download-action/DownloadAction';
import Divider from '../../../../../../components/ui/divider';

export enum eTypeElement {
    BACKGROUND_IMAGE = "1",
    TITLE = "2",
    PARAGRAPH = "3",
    FILE = "4",
    IMG = "5",
    VIDEO = "6",
    ITEM_MENU = "8",
    ACCORDEON = "7"
}

export interface IElementDynamicPage{
    id: string;  
    order: number;
    label: string;
    text: string;
    fontSize: string;
    type: eTypeElement;
    file?: File | null;
    height: number;
    align: string;
    link: string;
}

export interface IElementDynamicPageProps {
    isEdit: boolean;
    element: IElementDynamicPage,
    size: number;
    sectionId: string;
    handleDeleteElement?: (id: string) => void;
}
export const ElementDynamicPage: React.FC<IElementDynamicPageProps> = ({ size, element, sectionId, handleDeleteElement, isEdit }) => {


    return <CustomGrid size={size} >
        <>{handleDeleteElement && <CustomFab style={{ width: '30px', height: '30px' }} sx={{ position: 'absolute' }} onClick={() => { handleDeleteElement(element.id) }}>
            <DeleteActionIcon />
        </CustomFab>
        }
        </>
        <CustomBox sx={{ height: '100%', border: isEdit ? '0.2rem dashed #9E9E9E' : 'none', minHeight: 100, alignContent: 'center' }}>
            {element.type === eTypeElement.BACKGROUND_IMAGE ?
                <img width={'100%'} height={element.height} src={URL.createObjectURL(element.file as File)} /> :
                <></>}
            {element.type === eTypeElement.TITLE ?
                <TitlePages title={element.label} style={{ fontSize: element.fontSize, padding: '0px 2rem', textAlign: element.align }} /> :
                <></>}
            {element.type === eTypeElement.PARAGRAPH ?
                <CustomBox sx={{ alignContent: 'center', padding: '2rem', lineHeight: 'normal' }}>
                    <CustomRichTextView content={element.text} />
                </CustomBox> :
                <></>}
            {element.type === eTypeElement.FILE ?
                <CustomBox sx={{ alignContent: 'center', padding: '2rem', lineHeight: 'normal' }}>
                    <DownloadAction label={element.label} url={URL.createObjectURL(element.file as File)} />
                </CustomBox> :
                <></>}
            {element.type === eTypeElement.IMG ?
                <img
                    src={URL.createObjectURL(element.file as File)}
                    width={'100%'}
                    height={element.height > 0 ? element.height : 50} /> :
                <></>}
            {element.type === eTypeElement.VIDEO ?
                <VideoPlayer
                    file={element.file as File}
                    height={element.height} /> :
                <></>}

            {element.type === eTypeElement.ACCORDEON ?
                <><CustomAccordion
                    title={element.label}
                    titleSx={{
                        fontSize: '1.1rem',
                    }}
                    content={<CustomBox
                        sx={{
                            mb: 3,
                            p: 2,
                            backgroundColor: 'grey.50',
                            borderRadius: 1,
                            borderLeft: 1,
                            borderColor: 'primary.main'
                        }}
                    >
                        <CustomRichTextView content={element.text} />

                    </CustomBox>} /><Divider /></> : <></>}
        </CustomBox>
    </CustomGrid>
}
