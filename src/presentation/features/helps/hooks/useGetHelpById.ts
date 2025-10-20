import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IHelp } from '../../../../domain/entities/IHelp';

export function useGetHelpById() {
  const { getHelpById } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async (id: string): Promise<IHelp> => {
    setLoading(true);
    setError(null);
    try {
      const h = await getHelpById.execute(id);
      return h;
    } catch (e: any) {
      setError(e?.message ?? 'Error al obtener item ayuda');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [getHelpById]);

  return { fetchById, loading, error };
}

