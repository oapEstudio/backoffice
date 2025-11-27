import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IDynamicPage } from '../../../../domain/entities/IDynamicPage';

export function useGetDynamicPageById() {
  const { getDynamicPageById } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async (id: string): Promise<IDynamicPage> => {
    setLoading(true);
    setError(null);
    try {
      const n = await getDynamicPageById.execute(id);
      return n;
    } catch (e: any) {
      setError(e?.message ?? 'Error al obtener la página');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [getDynamicPageById]);

  return { fetchById, loading, error };
}

