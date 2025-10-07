
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { INotificationFormValues } from '../../NewCarouselPage';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Chip, Stack } from '@mui/material';
import { usePreviewUrl } from '../../../../../../utils/usePreviewUrl';
import { CustomStack } from '../../../../../../components/ui/stack/Stack';
import { Carousel } from '../../../../../../components/widgets-home-page/carousel/Carousel';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { colors } from '../../../../../../common/colors';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../../../../components/ui/divider';
import BlankCard from '../../../../../../components/ui/card/blank';
import { formatDate } from '../../../../../../utils/formatDate';
import { PreviewInfo } from './components/PreviewInfo';

const FIELDS = [
  'title','subtitle','img','hasButton','buttonTitle','buttonLink',
  'hasPublication','dateFrom','timeFrom','hasExpired','dateTo','timeTo','state','profiles'
] as const;

export const StepThreeNotifications: React.FC = () => {
  const { control } = useFormContext<INotificationFormValues>();
 
  const [
    title, subtitle, img, hasButton, buttonTitle, buttonLink,
    hasPublication, dateFrom, timeFrom, hasExpired, dateTo, timeTo, state, profiles
  ] = useWatch({ control, name: FIELDS });


  const previewUrl = usePreviewUrl(img);


  const previewInfo = [{
                title: 'Fecha de inicio',
                value: hasPublication ? `${formatDate(dateFrom!.toDate()) || '—'} - ${timeFrom!.format('HH:mm:ss') || ''}` : 'No'
              },{
                title: 'Fecha de caducidad',
                value: hasExpired ? `${formatDate(dateTo!.toDate()) || '—'} - ${timeTo!.format('HH:mm:ss') || ''}` : 'No'
              },{
                title: 'Link',
                value: buttonLink ?? 'No'
              },{
                title: 'Perfiles asignados',
                value: profiles.length.toString() ?? 'No'
              }];
  
  return (
    
     <CustomStack spacing={20} direction='column' sx={{justifyContent: 'center', alignItems: 'center'  }}>
         
              <CustomBox sx={{
                    width: 'min(100%, 1200px)', 
                    mx: 'auto',                
                    height: 530, 
                    border: '1px solid '+colors.whiteSmoke
                    }}>
                    <BlankCard>
                        <Carousel  key={previewUrl || 'no-img'} 
                                                        slides={[{
                                                        id: '0',
                                                        imageUrl: previewUrl as string,
                                                        isActive: true,
                                                        order: 1,
                                                        title: title,
                                                        subtitle: subtitle,
                                                        cta: hasButton?{
                                                            label: buttonTitle,
                                                            href: buttonLink,
                                                            target: '_blank'
                                                        }: undefined
                                        }]}  height={530}
                                            fullBleed={false}        
                                            arrowsAtEdges={false}  />
                    </BlankCard>
                   
              </CustomBox>
         
              <PreviewInfo preview={previewInfo}  />
         
     </CustomStack> 
  );
};

export default StepThreeNotifications;
