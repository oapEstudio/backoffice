import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../../../contexts/DependencyContext";
import type { IFilter } from "../../../../../../domain/entities/IFilter";


interface IUseHelpFilterStateProps {
  stateFilters?: Record<string, any>
}

export function useGetHelpStatus(filters?: IUseHelpFilterStateProps) {

  const { getHelpStatuses } = useContext(DependencyContext);

  const [result, setResult] = useState<IFilter[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      getHelpStatuses.execute(filters?.stateFilters? {filters: filters.stateFilters}: undefined)
        .then(res => setResult(res))
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getHelpStatuses]);
  
    return { result, loading, error };
}