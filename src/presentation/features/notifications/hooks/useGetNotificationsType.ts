import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";

export function useNotificationsType() {

  const { getNotificationTypes } = useContext(DependencyContext);

  const [result, setResult] = useState<IFilter[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      getNotificationTypes.execute()
        .then(res => setResult(res))
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getNotificationTypes]);
  
    return { result, loading, error };
}