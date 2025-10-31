import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';
import Typography from '@mui/material/Typography';
import ImageDropzone from '../../../../../../components/ui/img-drop-zone/ImageDropZone';
import { eTypeElement } from '../element-dynamic-page/ElementDynamicPage';
import { MAX_LENGTH_INPUT } from '../../../../../shared/constants/default-input';
import { env } from '../../../../../../../infrastructure/config/env';
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component';
import { CustomRichTextEditor } from '../../../../../../components/ui/rich-text-editor/CustomRichTextEditor';
import FileDropzone from '../../../../../../components/ui/file-drop-zone/FileDropzone';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '../../../../../../components/ui/button';


interface StepTwoDynamicPageProps{
    initialImageUrl?: string;
}
export const StepTwoDynamicPage: React.FC<StepTwoDynamicPageProps> = ({initialImageUrl}) => {

  const {
        control,
        formState: { errors },
        getValues
  } = useFormContext<IModalAddElementFormValues>();
    
  const formValue = getValues();

  const [colorButtonLeft,setColorButtonLeft] = useState(false);
  const [colorButtonRight,setColorButtonRight] = useState(false);
  const [colorButtonCenter,setColorButtonCenter] = useState(false);

  return (
    formValue.type===eTypeElement.BACKGROUND_IMAGE?
      <>
          <Controller
            name="file"
            control={control}
            rules={{
              validate: (v) => (v !== undefined || !!initialImageUrl) || 'Debes asignar una imagen',
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <ImageDropzone
                  multiple={false}
                  initialPreviewUrl={initialImageUrl}
                  value={field.value ? [field.value] : []}
                  onFiles={(files) => field.onChange(files[0])}
                  helperText="JPG/PNG hasta 3MB"             
                />
                {error && (
                  <Typography color="error" variant="caption">
                    {error.message}
                  </Typography>
                )}
              </>
            )}
          />
      </> : formValue.type===eTypeElement.TITLE?
      <>
         <Controller
                name="label"
                control={control}
                rules={{ 
                  required: 'El titulo es obligatorio', 
                  minLength: 10, 
                  maxLength: MAX_LENGTH_INPUT
                }}
                render={({ field }) => (
                  <CustomTextInput
                    {...field}
                    label="Titulo"
                    type='text'
                    maxLength={MAX_LENGTH_INPUT}
                    error={!!errors.label}
                    helperText={errors.label?.message}
                  />
                )}
              />
              <Controller 
                name='align'
                render={({field})=>(
                  <ButtonGroup variant="outlined" aria-label="Alineación">
                      <Button onClick={()=>{

                        field.onChange('left');

                        setColorButtonLeft(true);
                        setColorButtonRight(false);
                        setColorButtonCenter(false);

                      }} variant={colorButtonLeft? 'primary': 'secondary'} title={'Izquierda'} />
                      <Button onClick={()=>{

                        field.onChange('center');
                        
                        setColorButtonLeft(false);
                        setColorButtonRight(false);
                        setColorButtonCenter(true);

                      }} variant={colorButtonCenter? 'primary': 'secondary'} title={'Centrado'} />
                      <Button onClick={()=>{

                        field.onChange('right');
                        
                        setColorButtonLeft(false);
                        setColorButtonRight(true);
                        setColorButtonCenter(false);

                      }}  variant={colorButtonRight? 'primary': 'secondary'} title={'Derecha'} />
                  </ButtonGroup>
                )}
              />
      </> : formValue.type===eTypeElement.PARAGRAPH? 
      <>
      <Controller
              name="label"
              control={control}
              rules={{ 
                  required: 'El texto es obligatorio', 
                  minLength: 10
                }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomRichTextEditor                 
                    change={field.onChange}
                  />
                  {error && (
                    <Typography color="error" variant="caption">
                      {error.message}
                    </Typography>
                  )}
                </>
              )}
            />
       
      </> :  formValue.type===eTypeElement.FILE?
      <>
          <Controller
            name="file"
            control={control}
            rules={{
              validate: (v) => (v !== undefined) || 'Debes asignar una imagen',
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <FileDropzone
                  multiple={false}                 
                  value={field.value ? [field.value] : []}
                  onFiles={(files) => field.onChange(files[0])}                              
                />
                {error && (
                  <Typography color="error" variant="caption">
                    {error.message}
                  </Typography>
                )}
              </>
            )}
          />
      </> :  formValue.type===eTypeElement.IMG?
      <>
        <Controller
                    name="file"
                    control={control}
                    rules={{
                      validate: (v) => (v !== undefined || !!initialImageUrl) || 'Debes asignar una imagen',
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <ImageDropzone
                          multiple={false}
                          initialPreviewUrl={initialImageUrl}
                          value={field.value ? [field.value] : []}
                          onFiles={(files) => field.onChange(files[0])}
                          helperText="JPG/PNG hasta 3MB"             
                        />
                        {error && (
                          <Typography color="error" variant="caption">
                            {error.message}
                          </Typography>
                        )}
                      </>
                    )}
          />
          <Controller
                name="height"
                control={control}
                rules={{ 
                  required: 'El height es obligatorio',                                   
                }}
                render={({ field }) => (
                  <CustomTextInput
                    {...field}
                    label="HEIGHT"
                    type='number'                  
                    error={!!errors.height}
                    helperText={errors.height?.message}
                  />
                )}
              />
      </> :<></>
  )
}
