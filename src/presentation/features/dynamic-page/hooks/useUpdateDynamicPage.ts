import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IDynamicPage } from '../../../../domain/entities/IDynamicPage';
import type { IUpdateDynamicPageDto } from '../../../../application/dtos/IUpdateDynamicPageDto';

export function useUpdateDynamicPage(){

  const { updateDynamicPage } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, payload: IUpdateDynamicPageDto): Promise<IDynamicPage> => {
 
    setLoading(true);
    setError(null);

    try {

      const res = await updateDynamicPage.execute(id, payload);
      return res;
      
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar la pagina');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [updateDynamicPage]);

  return { update, loading, error };
}

