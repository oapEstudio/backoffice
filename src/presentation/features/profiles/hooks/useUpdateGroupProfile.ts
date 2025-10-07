import { useState } from 'react';
import { UpdateProfileGroupsUseCase } from '../../../../application/usecases/UpdateProfileGroupsUseCase';
import type { IProfileUpdateGroups } from '../../../../application/dtos/IProfileUpdateGroups';

export function useUpdateGroupProfile(useCase: UpdateProfileGroupsUseCase){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: string, data: IProfileUpdateGroups) =>{
        setLoading(true);
        setError(null);

        try{
            const updated = await useCase.execute(id, data);

            return updated;

        } catch(e: any){
            setError(e.message || 'Error, profile group update failed');
            throw e;
        }finally{
            setLoading(false);
        }       
    }

     return {update, loading,error};
}