import { useState, useEffect, useContext } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";

import { DependencyContext } from "../../../contexts/DependencyContext";

import type { IDynamicPage } from "../../../../domain/entities/IDynamicPage";

export function useGetDynamicPages(
  initialParams: IPageParameters
) {
  const {getDynamicPages} = useContext(DependencyContext);

  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IDynamicPage> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true);
    getDynamicPages.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [params, getDynamicPages]);

  return { result, loading, error, params, setParams };
}
