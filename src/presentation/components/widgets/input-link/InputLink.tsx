import React from 'react'
import type { FieldValues } from 'react-hook-form'
import type { ITextInput } from '../../ui/inputs/text-input/text-input.interface'
import CustomTextInput from '../../ui/inputs/text-input/text-input.component';
import { LinksIcon } from '../../ui/icons';


export const InputLink = <T extends FieldValues>(props: ITextInput<T>) => {

    
  
  return (
    <CustomTextInput
             {...props}
             icon = {<LinksIcon />}
    />
  )
}
