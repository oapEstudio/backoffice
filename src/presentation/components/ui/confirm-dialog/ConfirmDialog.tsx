import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



interface IConfirmDialogProps{
    open: boolean;
    onOk: ()=> void;
    onCancel: ()=> void;
}
export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({open,onOk,onCancel})=>{


  return (
  
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmacion!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Desea continuar con la operacion?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onOk} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}
