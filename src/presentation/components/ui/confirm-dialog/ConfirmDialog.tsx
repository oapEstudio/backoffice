import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomStack } from '../stack/Stack';
import Button from '../button/button.component';
import type { Breakpoint } from '@mui/material';



interface IConfirmDialogProps {
  open: boolean;
  title?: string;
  subtitle?: string;
  onOk: () => void;
  onCancel: () => void;
  labelCancel?: string;
  labelOk?: string;
}
export const ConfirmDialog: React.FC<IConfirmDialogProps> = (
  {
    open,
    title = '¡Confirmacion!',
    subtitle = '¿Desea continuar con la operación?',
    onOk,
    onCancel,
    labelCancel = 'Cancelar',
    labelOk = 'Aceptar'
  }) => {

    return (

    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {subtitle}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
          <CustomStack direction='row' spacing={5} sx={{  width: '100%',  justifyContent: 'center'}}>
            <Button variant={'secondary'}  title={labelCancel} onClick={onCancel}/>
            <Button variant={'primary'}  title={labelOk} onClick={onOk}/>
          </CustomStack>
      </DialogActions>
    </Dialog>
  );
}
