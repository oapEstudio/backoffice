import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomStack } from '../stack/Stack';
import Button from '../button/button.component';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons';



interface IConfirmDialogProps {
  open: boolean;
  icon?: 'warning' | 'error' | 'info' | 'success';
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
    icon = 'info',
    title = 'Información',
    subtitle = 'Por favor revise la información antes de continuar.',
    onOk,
    onCancel,
    labelCancel = 'Cancelar',
    labelOk = 'Aceptar'
  }) => {

    const renderIcon = () => {    
      switch (icon) {
        case 'warning':
          return <WarningIcon color="warning.main" />;
        case 'error':
          return <ErrorIcon color="error.main"/>;
        case 'info':
          return <InfoIcon />;
        case 'success':
          return <SuccessIcon />;
        default:
          return null;
      }
    };

    return (

    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ display : 'flex' , gap: '10px', alignItems: 'center', textAlign: 'center', ...(icon && { ml: '-35px' }), justifyContent: 'center'} }>
        {renderIcon()} {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
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
