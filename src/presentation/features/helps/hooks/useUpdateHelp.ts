import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IHelpUpdateDto } from '../../../../application/dtos/IHelpUpdateDto';
import type { IHelp } from '../../../../domain/entities/IHelp';

export function useUpdateHelp(){
  const { updateHelp } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, payload: IHelpUpdateDto): Promise<IHelp> => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateHelp.execute(id, payload);
      return res;
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar el item de ayuda');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [updateHelp]);

  return { update, loading, error };
}

