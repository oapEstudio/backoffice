import { useState, useMemo, useRef, useEffect } from 'react';
import { toSelectOption } from '../mappers/filterHelpsMapper';
import { useProfileFilterHelpOptions } from '../shared/components/hooks/useProfileFilterOptions';
import { useHelpFilterOptions } from '../shared/components/hooks/useHelpsFilterOptions';
import type { SelectOption } from '../../../components/ui/inputs/multiselect/multiselect.interface';
import { arraysEqual } from '../../../utils/arrayToEquals';

interface UseFilterHelpsPageProps {
  open: boolean;
  initialFilters: {
    profileIds?: (string | number)[];
    status: string[];
    helpType: string[];
  };
}

export function useFilterHelpsPage({ open, initialFilters }: UseFilterHelpsPageProps) {
  const { resultState, resultType, loading } = useHelpFilterOptions({
    stateFilters: { forUpdate: true }
  });
  
  const { profiles: profileFilters, loading: loadingProfiles } = useProfileFilterHelpOptions();
  
  const selectItemsStatuses: SelectOption[] = useMemo(
    () => resultState.map(toSelectOption),
    [resultState]
  );
  
  const selectItemsTypes: SelectOption[] = useMemo(
    () => resultType.map(toSelectOption),
    [resultType]
  );
  
  const [profileNames, setProfileNames] = useState<string[]>([]);
  const [profileIds, setProfileIds] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<SelectOption[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<SelectOption[]>([]);
  
  const wasOpen = useRef(false);

  useEffect(() => {
    const justOpened = open && !wasOpen.current;
    wasOpen.current = open;
    
    if (!open || loading || loadingProfiles) return;
    if (!justOpened) return;
    
    const nextIds = (initialFilters.profileIds ?? []).map(s => String(s).toLowerCase());
    setProfileIds(prev => (arraysEqual(prev, nextIds) ? prev : nextIds));
    
    const idSet = new Set(nextIds);
    const derivedNames = profileFilters
      .map(p => ({ id: p.id, name: p.description }))
      .filter(o => idSet.has(String(o.id).toLowerCase()))
      .map(o => String(o.name));
    
    if (derivedNames.length > 0) {
      setProfileNames(prev => (arraysEqual(prev, derivedNames) ? prev : derivedNames));
    } else {
      setProfileNames([]);
    }
    
    const nextStatuses = selectItemsStatuses.filter(o => 
      initialFilters.status.includes(String(o.id))
    );

    setSelectedStatuses(prev => {
      const prevIds = prev.map(x => String(x.id));
      const nextIds = nextStatuses.map(x => String(x.id));
      return arraysEqual(prevIds, nextIds) ? prev : nextStatuses;
    });
    
    const nextTypes = selectItemsTypes.filter(o => 
      initialFilters.helpType.includes(String(o.id))
    );
    setSelectedTypes(prev => {
      const prevIds = prev.map(x => String(x.id));
      const nextIds = nextTypes.map(x => String(x.id));
      return arraysEqual(prevIds, nextIds) ? prev : nextTypes;
    });

  }, [
    open,
    loading,
    loadingProfiles,
    selectItemsStatuses,
    selectItemsTypes,
    profileFilters,
    initialFilters,
  ]);

  return {
    selectItemsStatuses,
    selectItemsTypes,
    profileFilters,
    loading,
    loadingProfiles,
    profileNames,
    profileIds,
    selectedStatuses,
    selectedTypes,
    setProfileNames,
    setProfileIds,
    setSelectedStatuses,
    setSelectedTypes,
    wasOpen
  };
}