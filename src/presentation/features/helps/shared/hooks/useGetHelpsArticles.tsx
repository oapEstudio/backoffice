import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../../contexts/DependencyContext";
import type { IFilter } from "../../../../../domain/entities/IFilter";

export function useGetHelpArticles(search?: string) {
  const { getHelpArticles } = useContext(DependencyContext);
  const [result, setResult] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    setLoading(true);
    getHelpArticles.execute({ filters: { search: search, pageSize: 500} })
      .then(res => {
        if (!cancelled) {
          setResult(res.filter(r => r.description !== ''));
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
  }, [getHelpArticles, search]);
  
  return { result, loading, error };
}