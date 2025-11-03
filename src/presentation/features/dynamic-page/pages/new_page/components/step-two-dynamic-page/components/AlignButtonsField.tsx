import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ButtonGroup from '@mui/material/ButtonGroup';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import { Button } from '../../../../../../../components/ui/button';

export const AlignButtonsField: React.FC = () => {
  const { control } = useFormContext<IModalAddElementFormValues>();

  return (
    <Controller
      name="align"
      control={control}
      render={({ field }) => {
        const val = field.value as 'left'|'center'|'right'|undefined;
        return (
          <ButtonGroup variant="outlined" aria-label="Alineación">
            <Button
              onClick={() => field.onChange('left')}
              variant={val === 'left' ? 'primary' : 'secondary'}
              title="Izquierda"
            />
            <Button
              onClick={() => field.onChange('center')}
              variant={val === 'center' ? 'primary' : 'secondary'}
              title="Centrado"
            />
            <Button
              onClick={() => field.onChange('right')}
              variant={val === 'right' ? 'primary' : 'secondary'}
              title="Derecha"
            />
          </ButtonGroup>
        );
      }}
    />
  );
};
