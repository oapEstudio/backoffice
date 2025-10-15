import { useContext, useEffect, useRef, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseHelpDeskFilterOptionsProps {
  stateFilters?: Record<string, any>
}

export function useHelpFilterOptions(filters?: IUseHelpDeskFilterOptionsProps) {
  const { getHelpTypes, getHelpStatuses } = useContext(DependencyContext);

  const [resultState, setResultState] = useState<IFilter[]>([]);
  const [resultType, setResultType] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setLoading(true);
    Promise.all([getHelpStatuses.execute(), getHelpTypes.execute()])
      .then(([statuses, types]) => {
        if (!mountedRef.current) return;
        setResultState(statuses);
        setResultType(types);
      })
      .catch(err => {
        if (!mountedRef.current) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!mountedRef.current) return;
        setLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, []); // si las funciones son estables, está OK

  return { resultState, resultType, loading, error };
}
