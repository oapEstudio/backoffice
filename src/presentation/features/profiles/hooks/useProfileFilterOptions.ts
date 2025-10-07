import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";

export function useProfileFilterOptions() {
  const { getProfilesFilterProfiles, getProfileStatuses } = useContext(DependencyContext);
  const [profiles, setProfiles] = useState<IFilter[]>([]);
  const [statuses, setStatuses] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      getProfilesFilterProfiles.execute({filters: {PageSize: 1000}}),
      getProfileStatuses.execute(),
    ]).then(([pf, st]) => {
      if (!cancelled) {
        setProfiles(pf);
        setStatuses(st);
      }
    })
     .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
     .finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [getProfilesFilterProfiles, getProfileStatuses]);

  return { profiles, statuses, loading,error };
}