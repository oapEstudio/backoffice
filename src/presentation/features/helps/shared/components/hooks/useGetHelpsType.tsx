import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../../../contexts/DependencyContext";
import type { IFilter } from "../../../../../../domain/entities/IFilter";

export function useGetHelpType() {

  const { getHelpTypes } = useContext(DependencyContext);

  const [result, setResult] = useState<IFilter[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      getHelpTypes.execute()
        .then(res => setResult(res))
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getHelpTypes]);
  
    return { result, loading, error };
}