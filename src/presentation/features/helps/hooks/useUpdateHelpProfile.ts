import { useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { INotificationUpdateProfiles } from '../../../../application/dtos/INotificationUpdateProfiles';
import type { IHelpUpdateProfiles } from '../../../../application/dtos/IHelpUpdateProfiles';

export function useUpdateHelpProfile(){
    const { updateHelpProfiles } = useContext(DependencyContext)
       
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);
   
       const update = async (id: string, data: IHelpUpdateProfiles) =>{
           setLoading(true);
           setError(null);
   
           try{
               const updated = await updateHelpProfiles.execute(id, data);
   
               return updated;
   
           } catch(e: any){
               setError(e.message || 'Error al actualizar');
               throw e;
           }finally{
               setLoading(false);
           }       
       }
   
        return {update, loading,error};
}