import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { INotification } from '../../../../domain/entities/INotification';
import type { INotificationUpdateDto } from '../../../../application/dtos/INotificationUpdateDto';

export function useUpdateNotification(){
  const { updateNotification } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, payload: INotificationUpdateDto): Promise<INotification> => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateNotification.execute(id, payload);
      return res;
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar la notificación');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [updateNotification]);

  return { update, loading, error };
}

