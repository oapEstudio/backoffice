import * as React from 'react';
import Paper from '@mui/material/Paper';


import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CustomBox } from '../../../../../../../../components/ui/box/CustomBox';
import { CustomStack } from '../../../../../../../../components/ui/stack/Stack';

export interface TooltipCustomProfileProps  {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  lines?: Array<React.ReactNode>;
  footer?: React.ReactNode;

  width?: number | string;

  headerBg?: string;
  textColor?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
}

export const TooltipCustomProfile: React.FC<TooltipCustomProfileProps> = ({
  title = 'Título del cuadro',
  lines = [],
  width = 255,
  headerBg = '#FAFAFA',
  textColor = 'rgba(0,0,0,0.7)',
  borderColor = 'rgba(0,0,0,0.08)',
  radius = '10px',
  shadow = '0 2px 5.5px rgba(0,0,0,0.15)'
}) => {
  return (
    <Paper
      role="region"
      aria-label={typeof title === 'string' ? title : 'Cuadro informativo'}
      sx={{
        width,
        bgcolor: 'background.paper',
        color: textColor,
        border: '1px solid',
        borderColor,
        borderRadius: radius,
        boxShadow: shadow,
        overflow: 'hidden',
        lineHeight: 1.25,      
      }}
     
    >
      {/* Header */}
      <CustomBox
        sx={{
          bgcolor: headerBg,
          px: 1.5,
          py: 1,
          borderBottom: '1px solid',
          borderColor,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          minHeight: 33,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
       
      </CustomBox>
      <CustomBox sx={{ p: 1.5,px:0 }}>
        {lines.map((line, i) => (
          <CustomStack
            key={i}
            direction="row"
            spacing={1.25}
            alignItems={'center'}          
           
            sx={{ justifyContent: 'left', paddingLeft:'5%', mb: i < lines.length - 1 ? 0.75 : 0, borderBottom: '1px solid',borderColor }}
          >
            
            <Typography variant="body2">{line}</Typography>
          </CustomStack>
        ))}
       
      </CustomBox>

     
    </Paper>
  );
};

export default TooltipCustomProfile;
