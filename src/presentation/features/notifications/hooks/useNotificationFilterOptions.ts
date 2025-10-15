import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseNotificationFilterOptionsProps{
  stateFilters?: Record<string, any> 
}
export function useNotificationFilterOptions(filters?:IUseNotificationFilterOptionsProps) {


  const { getNotificationTypes } = useContext(DependencyContext);
  const { getNotificationStatuses } = useContext(DependencyContext);
  const { getNotificationCommon } = useContext(DependencyContext);

  const [resultState, setResultState] = useState<IFilter[]>([]);
  const [resultType, setResultType] = useState<IFilter[]>([]);
  const [resultCommon, setResultCommon] = useState<IFilter[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      Promise.all([
                    getNotificationStatuses.execute(filters?.stateFilters? {filters: filters.stateFilters}: undefined),
                    getNotificationTypes.execute({filters: {forUpdate: true}}),
                    getNotificationCommon.execute()])
        .then(([statuses, types,commons]) => {
          setResultState(statuses);
          setResultType(types);   
          setResultCommon(commons);     
        })
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getNotificationStatuses]);
  
    return { resultState, resultType, resultCommon,loading, error };
}