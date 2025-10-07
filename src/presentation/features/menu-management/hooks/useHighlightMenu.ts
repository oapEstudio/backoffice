import { useContext, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IHighlightMenuDto } from "../../../../application/dtos/IHighlightMenuDto";

export function useHighlightMenu(){
    
    const { highlightMenu } = useContext(DependencyContext);    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: string, data: IHighlightMenuDto) =>{
        
        setLoading(true);
        setError(null);

        try{
            const updated = await highlightMenu.execute(id, data);

            return updated;

        } catch(e: any){
            setError(e.message || 'Error, al destacar el menu');
            throw e;
        }finally{
            setLoading(false);
        }       
    }

     return {update, loading,error};
}