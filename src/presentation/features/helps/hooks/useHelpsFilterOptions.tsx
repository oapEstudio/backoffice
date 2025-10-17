import { useContext, useEffect, useRef, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseHelpFilterOptionsProps {
  stateFilters?: Record<string, any>
}

export function useHelpFilterOptions(filters?: IUseHelpFilterOptionsProps) {
  const { getHelpTypes, getHelpStatuses } = useContext(DependencyContext);

  const [resultState, setResultState] = useState<IFilter[]>([]);
  const [resultType, setResultType] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mountedRef = useRef(true);

  useEffect(() => {
      setLoading(true);
      Promise.all([getHelpStatuses.execute(filters?.stateFilters? {filters: filters.stateFilters} : undefined),getHelpTypes.execute()])
        .then(([statuses, types]) => {
          setResultState(statuses);
          setResultType(types);        
        })
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getHelpStatuses]);

  return { resultState, resultType, loading, error };
}
