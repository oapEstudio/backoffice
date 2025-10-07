import { useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';

export function useNotificationCancellation(){
    const { cancellationNotification } = useContext(DependencyContext)
       
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);
   
       const cancellation = async (id: string) =>{
           setLoading(true);
           setError(null);
   
           try{
               const updated = await cancellationNotification.execute(id);
   
               return updated;
   
           } catch(e: any){
               setError(e.message || 'Error al actualizar las notificaciones de carousel');
               throw e;
           }finally{
               setLoading(false);
           }       
       }
   
        return {cancellation, loading,error};
}