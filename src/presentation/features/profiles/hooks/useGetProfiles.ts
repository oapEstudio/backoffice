import { useState, useEffect } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import type { GetProfilesUseCase } from "../../../../application/usecases/GetProfilesUseCase";
import type { IProfile } from "../../../../domain/entities/IProfile";

export function useGetProfiles(
  useCase: GetProfilesUseCase,
  initialParams: IPageParameters
) {
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IProfile> | null>(null);
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
