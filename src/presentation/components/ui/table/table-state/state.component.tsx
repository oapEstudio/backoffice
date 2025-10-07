import React from 'react';
import CustomChip from '../../chip/chip.component';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import type IStateProps from './state.interface';

const StateComponent: React.FC<IStateProps> = ({ state }) => {
  let label = '';
  let severity: 'success' | 'primary' | 'error' | undefined = undefined;
  let icon: React.ReactNode | undefined = undefined;
  switch (state) {
    case 'Completo':
      severity = 'success';
      label = 'Completo';
      break;
    case 'Pendiente':
      severity = 'primary';
      label = 'Pendiente';
      break;
    case 'Pendiente con error':
      severity = 'error';
      label = 'Pendiente';
      icon = <ErrorOutlineIcon />;
      break;
    default:
      break;
  }

  return (
    <div>
      <CustomChip label={label} severity={severity}  />
    </div>
  );
};

export default StateComponent;