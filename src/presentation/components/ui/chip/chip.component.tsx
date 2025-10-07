import Chip from '@mui/material/Chip';
import type ICustomChipProps from './chip.interface';
import { styles } from './styles';

const CustomChip: React.FC<ICustomChipProps> = ({ label, severity = 'primary', icon }) => {
  
  return (
    <Chip
      label={label}
      size="small"
      sx={styles[severity]}
      icon={icon}
    />
  );
};

export default CustomChip;