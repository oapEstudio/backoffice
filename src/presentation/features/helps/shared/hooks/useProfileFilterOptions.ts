import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../../contexts/DependencyContext";
import type { IFilter } from "../../../../../domain/entities/IFilter";


export function useProfileFilterHelpOptions() {
  const { getProfilesFilterProfiles } = useContext(DependencyContext);
  const [profiles, setProfiles] = useState<IFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      getProfilesFilterProfiles.execute({filters: {PageSize: 1000}}),
    ]).then(([pf]) => {
      if (!cancelled) {
        setProfiles(pf);
      }
    })
     .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
     .finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);

  return { profiles, loading, error };
}