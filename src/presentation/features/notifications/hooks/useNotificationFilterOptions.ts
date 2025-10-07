import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseNotificationFilterOptionsProps{
  stateFilters?: Record<string, any> 
}
export function useNotificationFilterOptions(filters?:IUseNotificationFilterOptionsProps) {


  const { getNotificationTypes } = useContext(DependencyContext);

  const { getNotificationStatuses } = useContext(DependencyContext);

  const [resultState, setResultState] = useState<IFilter[]>([]);
  const [resultType, setResultType] = useState<IFilter[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      Promise.all([getNotificationStatuses.execute(filters?.stateFilters? {filters: filters.stateFilters}: undefined),getNotificationTypes.execute({filters: {forUpdate: true}})])
        .then(([statuses, types]) => {
          setResultState(statuses);
          setResultType(types);        
        })
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getNotificationStatuses]);
  
    return { resultState, resultType, loading, error };
}