import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IHelpUpdateDto } from '../../../../application/dtos/IHelpUpdateDto';
import type { IHelp } from '../../../../domain/entities/IHelp';

export function useUpdateHelp(){
  const { updateHelp } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);

  const update = useCallback(async (id: string, payload: IHelpUpdateDto): Promise<IHelp> => {
    setLoading(true);
    try {
      const res = await updateHelp.execute(id, payload);
      return res;
     } catch (err: any) {
        if (err instanceof Error) {
          throw new Error(`${err.message}`)
        }
        throw err;
      } finally {
      setLoading(false);
    }
  }, [updateHelp]);

  return { update, loading };
}

