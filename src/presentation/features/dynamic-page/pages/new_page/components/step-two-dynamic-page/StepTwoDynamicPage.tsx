import React, { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';

import { eTypeElement } from '../element-dynamic-page/ElementDynamicPage';
import { BgImageFields } from './components/BgImageFields';
import { TitleFields } from './components/TitleFields';
import { ParagraphFields } from './components/ParagraphFields';
import { FileFields } from './components/FileFields';
import { ImageFields } from './components/ImageFields';
import { VideoFields } from './components/VideoFields';


interface StepTwoDynamicPageProps{
    initialImageUrl?: string;
}
export const StepTwoDynamicPage: React.FC<StepTwoDynamicPageProps> = ({initialImageUrl}) => {

  const {
        control,       
  } = useFormContext<IModalAddElementFormValues>();
    
  const type = useWatch({ control, name: 'type' });


  const formByType: Record<eTypeElement, React.ReactElement | null> = {
    [eTypeElement.BACKGROUND_IMAGE]: <BgImageFields initialImageUrl={initialImageUrl} />,
    [eTypeElement.TITLE]: <TitleFields />,
    [eTypeElement.PARAGRAPH]: <ParagraphFields />,
    [eTypeElement.FILE]: <FileFields />,
    [eTypeElement.IMG]: <ImageFields initialImageUrl={initialImageUrl} />,
    [eTypeElement.VIDEO]: <VideoFields />,
    [eTypeElement.ITEM_MENU]: null
  };

  return formByType[type as eTypeElement] ?? null;
}
