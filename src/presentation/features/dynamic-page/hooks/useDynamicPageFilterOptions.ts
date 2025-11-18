import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseDynamicPageFilterOptionsProps{
  stateFilters?: Record<string, any> 
}
export function useDynamicPageFilterOptions(filters?:IUseDynamicPageFilterOptionsProps) {


  const { getDynamicPageStatuses } = useContext(DependencyContext);
  
  const [resultState, setResultState] = useState<IFilter[]>([]);
 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      Promise.all([
                    getDynamicPageStatuses.execute(filters?.stateFilters? {filters: filters.stateFilters}: undefined)])
        .then(([statuses]) => {
          
          setResultState(statuses);
           
        })
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getDynamicPageStatuses]);
  
    return { resultState ,loading, error };
}