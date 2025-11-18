import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../../contexts/DependencyContext";
import type { IFilter } from "../../../../../domain/entities/IFilter";


interface IUseHelpFilterStateProps {
  parentFilter?: Record<string, any>
}


export function useGetHelpsProfiles(filters?: IUseHelpFilterStateProps) {
  const { getHelpProfiles } = useContext(DependencyContext);

  const parentId = filters?.parentFilter?.parentId ;

  const [result, setResult] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {

    let cancelled = false;
    setLoading(true);

    getHelpProfiles
    .execute(parentId ? { filters: { parentId } } : {filters: {PageSize: 1000}})
    .then((res) => {
      const raw = res as IFilter[];
      const mapped: Array<{ id: string; name: string }> = raw.map(p => ({
        id: p.id,
        name: p.description,
      }));
      setResult(mapped);
      })
      
      .catch(err => !cancelled && setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [getHelpProfiles, parentId]);

  return { result, loading, error };
}


