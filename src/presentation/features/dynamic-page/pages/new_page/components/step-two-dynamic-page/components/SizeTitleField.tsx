import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ButtonGroup from '@mui/material/ButtonGroup';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import { Button } from '../../../../../../../components/ui/button';

export const SizeTitleField: React.FC = () => {
  const { control } = useFormContext<IModalAddElementFormValues>();

  return (
    <Controller
      name="fontSize"
      control={control}
      render={({ field }) => {

        const val = field.value as '1.33rem'|'2rem'|'2.5rem'|undefined;

        return (
          <ButtonGroup variant="outlined" aria-label="Alineación" sx={{display: 'flex',justifyContent: 'center'}}>
            <Button
              onClick={() => field.onChange('2.5rem')}
              variant={val === '2.5rem' ? 'primary' : 'secondary'}
              title="Grande"
            />
            <Button
              onClick={() => field.onChange('2rem')}
              variant={val === '2rem' ? 'primary' : 'secondary'}
              title="Mediano"
            />
            <Button
              onClick={() => field.onChange('1.33rem')}
              variant={val === '1.33rem' ? 'primary' : 'secondary'}
              title="Pequeño"
            />
          </ButtonGroup>
        );
      }}
    />
  );
};
