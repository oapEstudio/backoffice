import { useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { INotificationUpdateProfiles } from '../../../../application/dtos/INotificationUpdateProfiles';

export function useUpdateNotificationProfile(){
    const { updateNotificationProfiles } = useContext(DependencyContext)
       
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);
   
       const update = async (id: string, data: INotificationUpdateProfiles) =>{
           setLoading(true);
           setError(null);
   
           try{
               const updated = await updateNotificationProfiles.execute(id, data);
   
               return updated;
   
           } catch(e: any){
               setError(e.message || 'Error al actualizar las notificaciones de carousel');
               throw e;
           }finally{
               setLoading(false);
           }       
       }
   
        return {update, loading,error};
}