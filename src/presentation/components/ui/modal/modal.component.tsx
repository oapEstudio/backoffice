import * as React from 'react'
import { styled, type Breakpoint } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { CustomStack } from '../stack/Stack';
import Button from '../button/button.component';
import { colors } from '../../../common/colors'
import H5 from '../H5/H5'
import H6 from '../H6/H6'
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: any;
  onOk: () => void;
  onCancel: () =>void;
  maxWidth: Breakpoint;
  disabled: boolean;
  labelCancel?: string;
  labelOk?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title = 'Modal title',
  subtitle = '',
  children,
  onOk,
  onCancel,
  maxWidth = 'md',
  disabled= false,
  labelCancel = 'Cancelar',
  labelOk = 'Aceptar'
}) => {
  return (
    <BootstrapDialog
      onClose={(_, reason) => {
        
        if (reason === 'backdropClick') return;

        onClose();

      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      disableEscapeKeyDown 
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle sx={{ m: 0, p: 2, color:  colors.palette.primary.main }} id="backoffice-dialog-title">
        <CustomStack direction="column" spacing={0.5}>
          <H5>{title}</H5>
          <>{subtitle && <Typography sx={{ color: colors.palette.primary.disabled }}>{subtitle}</Typography>}</>
        </CustomStack>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
          <CustomStack direction='column' spacing={2}>
            {children}
          </CustomStack>   
      </DialogContent>

      <DialogActions>
          <CustomStack direction='row' spacing={5} sx={{  width: '100%',  justifyContent: 'center'}}>
            <Button variant={'secondary'}  title={labelCancel} onClick={onCancel}/>
            <Button variant={'primary'}  title={labelOk} onClick={onOk} disabled={disabled} />
          </CustomStack>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default CustomModal
