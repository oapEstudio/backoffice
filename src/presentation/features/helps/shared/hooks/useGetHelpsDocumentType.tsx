import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../../contexts/DependencyContext";
import type { IFilter } from "../../../../../domain/entities/IFilter";

export function useGetHelpDocumentType() {
  const { getHelpDocumentTypes } = useContext(DependencyContext);
  const [result, setResult] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    setLoading(true);
    getHelpDocumentTypes.execute()
      .then(res => {
        if (!cancelled) {
          setResult(res);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, [getHelpDocumentTypes]);
  
  return { result, loading, error };
}