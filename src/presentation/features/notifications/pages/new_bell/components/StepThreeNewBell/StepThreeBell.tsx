
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CustomStack } from '../../../../../../components/ui/stack/Stack';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { colors } from '../../../../../../common/colors';

import BlankCard from '../../../../../../components/ui/card/blank';
import { formatDate } from '../../../../../../utils/formatDate';
import { PreviewInfo } from '../../../../shared/components/preview-info/PreviewInfo';
import type { INotificationFormValues } from '../../../../shared/interface/INotificationFormValues';
import { NotificationBellRow } from '../../../../../../components/widgets-home-page/notification-bell-rows/NotificationBellRows';
import { DangerIcon } from '../../../../../../components/ui/icons';
import { selectedIconsNotificationCommon } from '../../../../shared/utils/selected-icon-notification-common';

const FIELDS = [
  'title','subtitle','hasButton','buttonTitle','buttonLink',
  'hasPublication','dateFrom','timeFrom','hasExpired','dateTo','timeTo','state','profiles','notificationCommonTypeId'
] as const;

export const StepThreeBell: React.FC = () => {
  const { control } = useFormContext<INotificationFormValues>();
 
  const [
    title, subtitle, hasButton, buttonTitle, buttonLink,
    hasPublication, dateFrom, timeFrom, hasExpired, dateTo, timeTo, state, profiles, notificationCommonTypeId
  ] = useWatch({ control, name: FIELDS });


  

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
              },{
                title: 'Tipo de notificacion',
                value: selectedIconsNotificationCommon(notificationCommonTypeId)
              }];
  
  return (
    
     <CustomStack spacing={5} direction='column' sx={{justifyContent: 'center', alignItems: 'center'  }}>
         
              <CustomBox sx={{
                    width: 'min(100%, 1200px)', 
                    mx: 'auto',                
                    height: 230, 
                    border: '1px solid '+colors.whiteSmoke
                    }}>
                    <BlankCard>
                       <NotificationBellRow items={[
                        {
                          id: '1',
                          notificationTypeId: notificationCommonTypeId, 
                          title: title,
                          description: subtitle,
                          cta: buttonTitle && buttonLink? { title: buttonTitle, href: buttonLink } : undefined, 
                        }
                      ]} titleLeft={''} 
                      
                      iconResolver={(typeId) => {
                    
                          return selectedIconsNotificationCommon(typeId.toString());
                        }}
                      />
                    </BlankCard>
                   
              </CustomBox>
         
              <PreviewInfo preview={previewInfo}  />
         
     </CustomStack> 
  );
};

export default StepThreeBell;
