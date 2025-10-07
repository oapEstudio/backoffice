import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { CustomBox } from '../../../ui/box/CustomBox'
import { CustomStack } from '../../../ui/stack/Stack'
import type React from 'react'
import { colors } from '../../../../common/colors'
import Divider from './../../../ui/divider-home';
interface IContainerSlideTitleProps{
    height: number;
    title: string;
    subtitle?: string;
    button?: {label: string; href: string; target?: "_self" | "_blank"};
}

export const ContainerSlideTitle: React.FC<IContainerSlideTitleProps> = ({height,title,subtitle,button}) => {
  return (

      <Paper
        sx={{
          position: 'relative',
          zIndex: 1,
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: height , md: height },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderRadius: 0,
         
          backdropFilter: { xs: 'blur(2px)', md: 'none' },        
          paddingBottom: {xs: '10%'},
          paddingLeft: { xs: '20%', md: 15},
          paddingRight: { xs: '15%', md: 15},
          paddingTop: {xs: '5%'}
          
        }}
        elevation={0}
      >
        <CustomStack spacing={2} sx={{ maxWidth: 640, width: '100%' }}>
          <Typography variant="h1" sx={{ overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
              whiteSpace: 'normal', fontSize: {xs: '1.5rem', md: '2rem', lg: '2rem'}}}>{title}</Typography>
          <Divider style={{width: '20%', background: colors.palette.primary.main}}/>
          <>
          {!!subtitle && (
            <Typography sx={{
              fontSize: { md: '16px', lg: '16px', xs: '1rem' },
              // 🔹 Clamp multi-línea + cortes de palabra
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
              whiteSpace: 'normal',
            }}>
              {subtitle}
            </Typography>
          )}
          </>
         <>
         {button && (
                <CustomBox
                  component="a"
                  href={button.href}
                  target={button.target ?? '_self'}
                  rel={button.target === '_blank' ? 'noopener noreferrer' : undefined}
                  sx={{
                    mt: 1,
                    width: 190,
                    height: 48,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 0,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    userSelect: 'none',
                    textDecoration: 'none',
                    '&:hover': { bgcolor: 'primary.dark' },
                    '&:focus-visible': { outline: '2px solid #fff', outlineOffset: 2 },
                  }}
                >
                  {button.label ?? 'Conocé más'}
                </CustomBox>
              )}
         </>
        </CustomStack>
      </Paper>

  )
}
