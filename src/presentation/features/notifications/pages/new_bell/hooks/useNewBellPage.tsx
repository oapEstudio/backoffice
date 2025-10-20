import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { NOTIFICATION } from "../../../../../router/routes";
import {NOTIFICATION_BELL } from "../../../shared/constants/notifications";
import { usePageActionsStep } from "../../../shared/hooks/usePageActionsStep";
import type { INotificationFormValues } from "../../../shared/interface/INotificationFormValues";
import { eStep } from "../../../shared/reducers/ActionStepReducer";

export function useNewBellPage(){

     const {handleBack,
            handleNext,
            form,
            state,
            dispatch,
            navigate,
            contentStepRef,
            navSteps,
            create} = usePageActionsStep();

      const onSubmit = async (data: INotificationFormValues) => {
         try {
                 
           if(false || state.step == eStep.SUCCESS) return;
  
           dispatch({
              type: 'SUCCESS',
              payload: ''
            });
  
             const newId = await create({
                buttonLink: data.hasButton? data.buttonLink : '',
                buttonText: data.hasButton? data.buttonTitle: '',
                dateFrom: data.hasPublication? data.dateFrom!.format('YYYY-MM-DD') : null,
                dateTO: data.hasExpired? data.dateTo!.format('YYYY-MM-DD'): null,
                timeFrom: data.hasPublication? data.timeFrom!.format('HH:mm:ss'): null,
                timeTO: data.hasExpired? data.timeTo!.format('HH:mm:ss'): null,
                description: data.subtitle,
                name: data.name,
                notificationCommonTypeId: data.notificationCommonTypeId,
                title: data.title,              
                notificationTypeId: NOTIFICATION_BELL.toString(),
                profiles: data.profiles.map(x => x.id),
                statusId: Number(data.state),
                image: null
             });
     
           Toast({
             message: 'Notificación creada correctamente',
             type: eToast.Success
           });
  
           navigate(NOTIFICATION.name);
  
         } catch(e) {
           
          dispatch({
              type: 'STEP_THREE',
              payload: ''
            });
           Toast({
             message: 'Error al crear la notificación',
             type: eToast.Error
           });
         }
       }
    return {
        handleBack,
            handleNext,
            form,
            contentStepRef,
            navSteps,
            state,
            onSubmit
    }
}