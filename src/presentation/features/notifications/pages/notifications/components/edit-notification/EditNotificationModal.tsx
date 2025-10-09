import React, { useEffect, useMemo } from 'react';
import CustomModal from '../../../../../../components/ui/modal/modal.component';
import { FormProvider, useForm } from 'react-hook-form';
import NotificationDetailsFields from '../../../../shared/components/NotificationDetailsFields';
 

import dayjs from 'dayjs';
import { useGetNotificationById } from '../../../../hooks/useGetNotificationById';
import { useUpdateNotification } from '../../../../hooks/useUpdateNotification';
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import type { INotification } from '../../../../../../../domain/entities/INotification';
import type { INotificationUpdateDto } from '../../../../../../../application/dtos/INotificationUpdateDto';
import { dataUrlToFile } from '../../../../../../utils/dataUrlToFile';
import Loading from '../../../../../../components/ui/loading';
import type { INotificationFormValues } from '../../../../shared/interface/INotificationFormValues';
import { NOTIFICATION_ALERT, NOTIFICATION_CAROUSEL } from '../../../../shared/constants/notifications';
import { NotificationAlertDetailFields } from '../../../../shared/components/notification-alert-detail-fields/NotificationAlertDetailFields';
 
interface EditNotificationModalProps {
  open: boolean;
  notificationId: string | null;
  onClose: () => void;
  onSaved: () => void;
}
 
export const EditNotificationModal: React.FC<EditNotificationModalProps> = ({ open, notificationId, onClose, onSaved }) => {
  
  const { fetchById, loading: loadingFetch } = useGetNotificationById();
  const { update, loading: loadingUpdate } = useUpdateNotification();
  const [current, setCurrent] = React.useState<INotification | null>(null);
  const existingImageFileRef = React.useRef<File | null>(null);
 
  const form = useForm<INotificationFormValues>({
    defaultValues: {
      name: '',
      profiles: [],
      img: undefined as any,
      subtitle: '',
      state: '2',
      title: '',
      hasButton: true,
      hasPublication: false,
      hasExpired: false,
      dateFrom: null,
      timeFrom: null,
      dateTo: null,
      timeTo: null,
      buttonLink: '',
      buttonTitle: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

 
  useEffect(() => {
    if (!open || !notificationId) return;
    
    setCurrent(()=>null);

    (async () => {
      try {
        
        const n: INotification = await fetchById(notificationId);
        
        setCurrent(n);
        
        if (n.imagenLink?.startsWith('data:image/')) {
        
          existingImageFileRef.current = dataUrlToFile(
            n.imagenLink,
            `notification-${n.id}`
          );

        } else {
          existingImageFileRef.current = null; 
        }

      form.reset({
          name: n.name ?? '',
          profiles: (n.profiles ?? []).map(p => ({ id: String(p.id), name: p.name })),
          img: undefined as any,
          subtitle: n.description ?? '',
          state: String(n.statusId ?? ''),
          title: n.title ?? '',
          hasButton: !!n.buttonText,
          hasPublication: !!n.hasImmediatePublication,
          hasExpired: !!n.hasExpiration,
          dateFrom: n.dateFrom ? dayjs(n.dateFrom) : null,
          timeFrom: n.timeFrom ? dayjs(n.timeFrom) : null,
          dateTo:   n.dateTO   ? dayjs(n.dateTO)   : null,   
          timeTo:   n.timeTO   ? dayjs(n.timeTO)   : null,
          buttonLink: n.buttonLink ?? '',
          buttonTitle: n.buttonText ?? '',
        });


      } catch {
       
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, notificationId]);
 
  const handleOk = form.handleSubmit(async (data) => {

    if (!notificationId) return;

    const imageToSend = data.img ?? existingImageFileRef.current ?? (undefined as any);

    try {
      const payload: INotificationUpdateDto = {
        notificationTypeId: String(current?.notificationTypeId ?? ''),
        name: data.name,
        title: data.title,
        description: data.subtitle,
        image: imageToSend,
        buttonText: data.hasButton ? data.buttonTitle : '',
        buttonLink: data.hasButton ? data.buttonLink : '',
        statusId: Number(data.state),
        dateFrom: data.hasPublication && data.dateFrom ? data.dateFrom.format('YYYY-MM-DD') : (undefined as any),
        timeFrom: data.hasPublication && data.timeFrom ? data.timeFrom.format('HH:mm:ss') : (undefined as any),
        dateTo: data.hasExpired && data.dateTo ? data.dateTo.format('YYYY-MM-DD') : (undefined as any),
        timeTo: data.hasExpired && data.timeTo ? data.timeTo.format('HH:mm:ss') : (undefined as any),
      };
 
      await update(notificationId, payload);

      Toast({ message: 'Notificación actualizada', type: eToast.Success });
      
      onSaved();
      onClose();

    } catch {
      Toast({ message: 'Error al actualizar la notificación', type: eToast.Error });
    }
  });
 
  return (
    <CustomModal
      title={'Editar notificación'}
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={handleOk}
      disabled={loadingFetch || loadingUpdate || !form.formState.isValid}
      maxWidth="sm"
    >
      <FormProvider {...form}>
        {loadingFetch && !current? 
          <center> <Loading /> </center> :
          current?.notificationTypeId == NOTIFICATION_CAROUSEL? <NotificationDetailsFields 
                                                                    autoCleanup 
                                                                    disabledState={false} 
                                                                    initialImageUrl={current?.imagenLink} 
                                                                />:
          current?.notificationTypeId == NOTIFICATION_ALERT? <NotificationAlertDetailFields 
                                                                    autoCleanup 
                                                              /> : <><p>future componente</p></>

        }
      </FormProvider>
    </CustomModal>
  );
};
 
export default EditNotificationModal;