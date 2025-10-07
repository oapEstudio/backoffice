import { useContext, useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IHighlight } from "../../../../domain/entities/IHighlight";

export function useGetHighlighted(
  initialParams: IPageParameters
) {
  const {getHighlighteds} = useContext(DependencyContext);
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IHighlight> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true);
    getHighlighteds.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [params, getHighlighteds]);

  return { result, loading, error, params, setParams };
}