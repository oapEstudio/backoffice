import { useState, useEffect, useContext } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IHelp } from "../../../../domain/entities/IHelp";
import { mapHelpFromBackend } from "../mappers/mapHelpFromBackend";

export function useGetHelps (
  initialParams: IPageParameters
) {
  const { getHelps } = useContext(DependencyContext);

  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IHelp> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)

useEffect(() => {
    setLoading(true);
    getHelps.execute(params)
        .then(res => {
            const mappedData = {
                ...res,
                data: res.data.map(mapHelpFromBackend)
            };
            setResult(mappedData);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
}, [params]);

  return { result, loading, error, params, setParams };
}
