import { useState, useEffect, useContext } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IHelpDesk } from "../../../../domain/entities/IHelpDesk";

export function useGetHelpDesk (
  initialParams: IPageParameters
) {
  const { getHelpDesk } = useContext(DependencyContext);

  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IHelpDesk> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true);
    getHelpDesk.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [params, getHelpDesk]);

  return { result, loading, error, params, setParams };
}
