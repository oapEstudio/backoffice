import { useContext, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IUpdateMenuOrderRootDto } from "../../../../application/dtos/IUpdateMenuOrderRootDto";


export function useUpdateMenuRootOrder(){
    const { updateMenuOrderRoot } = useContext(DependencyContext)
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: IUpdateMenuOrderRootDto) =>{
        setLoading(true);
        setError(null);

        try{
            const updated = await updateMenuOrderRoot.execute(data);

            return updated;

        } catch(e: any){
            setError(e.message || 'Error, no se pudo actualizar el orden del menu');
            throw e;
        }finally{
            setLoading(false);
        }       
    }

     return {update, loading,error};
}