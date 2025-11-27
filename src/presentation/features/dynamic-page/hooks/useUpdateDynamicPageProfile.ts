import { useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IDynamicPageUpdateProfiles } from '../../../../application/dtos/IDynamicPageUpdateProfiles';

export function useUpdateDynamicPageProfile(){
    const { updateDynamicPageProfiles } = useContext(DependencyContext)
       
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);
   
       const update = async (id: string, data: IDynamicPageUpdateProfiles) =>{
           setLoading(true);
           setError(null);
   
           try{
               const updated = await updateDynamicPageProfiles.execute(id, data);
   
               return updated;
   
           } catch(e: any){
               setError(e.message || 'Error al actualizar los perfiles de la página');
               throw e;
           }finally{
               setLoading(false);
           }       
       }
   
        return {update, loading,error};
}