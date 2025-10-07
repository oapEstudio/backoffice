import { useState } from "react";
import type { UpdateProfileUseCase } from "../../../../application/usecases/UpdateProfileUseCase";
import type { IProfileUpdateDto } from "../../../../application/dtos/IProfileUpdateDto";

export function useUpdateProfile(useCase: UpdateProfileUseCase){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: string, data: IProfileUpdateDto) =>{
        setLoading(true);
        setError(null);

        try{
            const updated = await useCase.execute(id, data);

            return updated;

        } catch(e: any){
            setError(e.message || 'Error, profile update failed');

            throw e;
        }finally{
            setLoading(false);
        }       
    }

     return {update, loading,error};
}