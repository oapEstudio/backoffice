import { useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';

export function useDynamicPageCancellation(){
    const { cancellationDynamicPage } = useContext(DependencyContext)
       
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);
   
       const cancellation = async (id: string) =>{
           setLoading(true);
           setError(null);
   
           try{
               const updated = await cancellationDynamicPage.execute(id);
   
               return updated;
   
           } catch(e: any){
               setError(e.message || 'Error al dar de baja la pagina');
               throw e;
           }finally{
               setLoading(false);
           }       
       }
   
        return {cancellation, loading,error};
}