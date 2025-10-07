import { useContext, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IMenuEditDto } from "../../../../application/dtos/IMenuEditDto";

export function useUpdateMenu(){
    const { updateMenu } = useContext(DependencyContext)
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: string, data: IMenuEditDto) =>{
        setLoading(true);
        setError(null);

        try{
            const updated = await updateMenu.execute(id, data);

            return updated;

        } catch(e: any){
            setError(e.message || 'Error, menu update failed');
            throw e;
        }finally{
            setLoading(false);
        }       
    }

     return {update, loading,error};
}