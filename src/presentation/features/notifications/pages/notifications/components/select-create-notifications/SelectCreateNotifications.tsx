import React, { useMemo, useState, type ChangeEvent } from 'react'
import { colors } from '../../../../../../common/colors';
import { NEW_ALERT, NEW_CAROUSEL } from '../../../../../../router/routes';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component';
import { useNotificationsType } from '../../../../hooks/useGetNotificationsType';
import { toNotificationSelect } from '../../../../mappers/notificationMapper';
import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import { NOTIFICATION_ALERT, NOTIFICATION_CAROUSEL } from '../../../../shared/constants/notifications';
import { useNavigate } from 'react-router-dom';

 const styleCustomSelect = { '& .MuiOutlinedInput-root': { height: 36}, 
                          '& .MuiSelect-select, & .MuiOutlinedInput-input': { 
                            paddingTop: '8px', 
                            paddingBottom: '8px', 
                            color: 'white',
                            border: 0,
                            backgroundColor: colors.palette.primary.main,
                            boxShadow: ' 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)' }, 
                        };

export const SelectCreateNotifications = () => {
  
  const {result, loading} = useNotificationsType();
  const [selectedNotification, setSelectedNotification] = useState('');
  const navigate = useNavigate();
  
  const rows: SelectOption[] = useMemo(
    () => (result ?? []).map(p => toNotificationSelect(p)),
    [result]
  )

  const handlerNotifications = (event: ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string; }})) => {       
          setSelectedNotification(String(event.target.value));
          
          if(event.target.value == NOTIFICATION_CAROUSEL) navigate(NEW_CAROUSEL.name);
          if(event.target.value == NOTIFICATION_ALERT) navigate(NEW_ALERT.name);
          
          
  };
  
  return (
     <CustomBox sx={{width: '200px'}}>
                <CustomSelect 
                    displayEmpty
                    placeholder={'Nueva notificación'}
                    size='small'
                    sx={styleCustomSelect}                    
                    value={selectedNotification}
                    onChange={handlerNotifications}
                    options={rows}/>
            </CustomBox>
  )
}
