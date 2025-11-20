import Tooltip from "@mui/material/Tooltip";
import { CustomBox } from "../../../box/CustomBox";


export const Swatch: React.FC<{
  color?: string;          
  title?: string;
  onPick: (c?: string) => void;
  size?: number;
}> = ({ color, title, onPick, size = 24 }) => (
  <Tooltip title={title ?? (color ?? 'Limpiar')}>
    <CustomBox
      onClick={() => onPick(color)}
      sx={{
        width: size,
        height: size,
        borderRadius: '4px',
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        background: color ?? 'transparent',
        position: 'relative',
        '&:hover': { outline: '2px solid rgba(0,0,0,0.15)' },
      }}
    >
      {!color && (
        
        <CustomBox
          component="span"
          sx={{
            width: '70%',
            height: 0,
            borderTop: '2px solid',
            borderColor: 'text.secondary',
            transform: 'rotate(45deg)',
          }}
        />
      )}
    </CustomBox>
  </Tooltip>
);