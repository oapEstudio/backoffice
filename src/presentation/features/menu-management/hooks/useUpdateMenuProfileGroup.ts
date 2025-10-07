import { useContext, useState } from 'react';
import { UpdateMenuProfileGroupUseCase } from '../../../../application/usecases/UpdateMenuProfileGroupUseCase';
import type { IMenuProfileGroupUpdateDto } from '../../../../application/dtos/IMenuProfileGroupUpdateDto';
import { DependencyContext } from '../../../contexts/DependencyContext';


export function useUpdateMenuProfileGroup(){
    const { updateMenuProfileGroup } = useContext(DependencyContext)
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: string, data: IMenuProfileGroupUpdateDto) =>{
        setLoading(true);
        setError(null);

        try{
            const updated = await updateMenuProfileGroup.execute(id, data);

            return updated;

        } catch(e: any){
            setError(e.message || 'Error, menu profile group update failed');
            throw e;
        }finally{
            setLoading(false);
        }       
    }

     return {update, loading,error};
}