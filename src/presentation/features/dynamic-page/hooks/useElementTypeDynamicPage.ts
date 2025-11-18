import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseElementTypeDynamicPageProps{
  elementTypeFilters?: Record<string, any> 
}
export function useElementTypeDynamicPage(filters?:IUseElementTypeDynamicPageProps) {


  const { getElementTypeDynamicPage } = useContext(DependencyContext);
  
  const [resultTypes, setResultTypes] = useState<IFilter[]>([]);
 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
      setLoading(true);
      Promise.all([
                    getElementTypeDynamicPage.execute(filters?.elementTypeFilters? {filters: filters.elementTypeFilters}: undefined)])
        .then(([elementTypes]) => {
          
          setResultTypes(elementTypes);
           
        })
        .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
        .finally(() => setLoading(false));
  }, [getElementTypeDynamicPage]);
  
    return { resultTypes ,loading, error };
}