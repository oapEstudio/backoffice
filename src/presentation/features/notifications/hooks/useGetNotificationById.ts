import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { INotification } from '../../../../domain/entities/INotification';

export function useGetNotificationById() {
  const { getNotificationById } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async (id: string): Promise<INotification> => {
    setLoading(true);
    setError(null);
    try {
      const n = await getNotificationById.execute(id);
      return n;
    } catch (e: any) {
      setError(e?.message ?? 'Error al obtener la notificación');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [getNotificationById]);

  return { fetchById, loading, error };
}

