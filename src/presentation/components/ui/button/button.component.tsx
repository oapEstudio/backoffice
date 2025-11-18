import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type IButtonProps from './button.interface';
import { styles } from './styles';
import './button.css';

const Button: React.FC<IButtonProps> = ({ title, variant, icon, onClick, disabled, style, className = 'btn-backoffice' }) => {
  return (
    <MuiButton  
      variant={variant === 'primary'?'contained': 'outlined'}
      color="primary"
      onClick={onClick}
      className={className}
      disabled={disabled}
      style={style}
      sx={variant === 'primary' ? styles.primary : (variant === 'secondary' ? styles.secondary : styles.danger)}
    >
      {icon && icon}
      {title}
    </MuiButton>
  );
};

export default Button;