import { useContext, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IMenuEditDto } from "../../../../application/dtos/IMenuEditDto";
import type { IUpdateMenuOrderDto } from "../../../../application/dtos/IUpdateMenuOrderDto";

export function useUpdateMenuOrder(){
    const { updateMenuOrder } = useContext(DependencyContext)
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: IUpdateMenuOrderDto) =>{
        setLoading(true);
        setError(null);

        try{
            const updated = await updateMenuOrder.execute(data);

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