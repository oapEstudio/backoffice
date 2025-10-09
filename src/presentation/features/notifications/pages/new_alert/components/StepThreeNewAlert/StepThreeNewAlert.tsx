import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import BlankCard from '../../../../../../components/ui/card/blank';
import { PreviewInfo } from '../../../../shared/components/preview-info/PreviewInfo';
import { colors } from '../../../../../../common/colors';
import { RedStripe } from '../../../../../../components/widgets-home-page/red-stripe/RedStripe';
import { useFormContext, useWatch } from 'react-hook-form';
import type { INotificationFormValues } from '../../../../shared/interface/INotificationFormValues';
import { formatDate } from '../../../../../../utils/formatDate';


const FIELDS = [
  'title', 'hasPublication','dateFrom','timeFrom','hasExpired','dateTo','timeTo','state','profiles'
] as const;

export const StepThreeNewAlert = () => {
  
  const { control } = useFormContext<INotificationFormValues>();
  
  const [      
      title,hasPublication, dateFrom, timeFrom, hasExpired, dateTo, timeTo, state, profiles
    ] = useWatch({ control, name: FIELDS });

   const previewInfo = [{
                  title: 'Fecha de inicio',
                  value: hasPublication ? `${formatDate(dateFrom!.toDate()) || '—'} - ${timeFrom!.format('HH:mm:ss') || ''}` : 'No'
                },{
                  title: 'Fecha de caducidad',
                  value: hasExpired ? `${formatDate(dateTo!.toDate()) || '—'} - ${timeTo!.format('HH:mm:ss') || ''}` : 'No'
                },{
                  title: 'Perfiles asignados',
                  value: profiles.length.toString() ?? 'No'
                }];
  return (
    
     <CustomStack spacing={5} direction='column' sx={{justifyContent: 'center', alignItems: 'center'  }}>
         
              <CustomBox sx={{
                    width: 'min(100%, 1200px)', 
                    mx: 'auto',                
                    height: 100, 
                    border: '1px solid '+colors.whiteSmoke
                    }}>
                    <BlankCard>
                        <RedStripe message={title} />
                    </BlankCard>
                   
              </CustomBox>
         
              <PreviewInfo preview={previewInfo}  />
         
     </CustomStack> 
  );
}
