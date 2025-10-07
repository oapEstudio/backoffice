import { useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import type { GetMenuUseCase } from "../../../../application/usecases/GetMenuUseCase";
import type { IMenu } from "../../../../domain/entities/IMenu";

export function useGetMenues(
  useCase: GetMenuUseCase,
  initialParams: IPageParameters
) {
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IMenu> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true);
    useCase.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [params, useCase]);

  return { result, loading, error, params, setParams };
}