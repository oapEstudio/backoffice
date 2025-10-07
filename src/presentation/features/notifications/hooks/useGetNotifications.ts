import { useState, useEffect, useContext } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import type { GetProfilesUseCase } from "../../../../application/usecases/GetProfilesUseCase";
import type { IProfile } from "../../../../domain/entities/IProfile";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { INotification } from "../../../../domain/entities/INotification";

export function useGetNotifications(
  initialParams: IPageParameters
) {
  const {getNotifications} = useContext(DependencyContext);

  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<INotification> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true);
    getNotifications.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [params, getNotifications]);

  return { result, loading, error, params, setParams };
}
