import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { ItemList } from '../../ui/dual-list/DualList';
import type { IFilter } from '../../../../domain/entities/IFilter';
import CustomDualListFetch from '../custom-dual-list-fetch/CustomDualListFetch';

export interface DualProfileFetchProps {

  selectedProfiles?: Array<{ id: string; name: string }>;
  selectedFilters?: string[] | undefined;
  initialLeftProfiles?: Array<{ id: string; name: string }>;
  remountKey?: string;
  onChange: (newAssigned: string[]) => void;
  onChangeProfiles?: (newAssignedProfiles: Array<{ id: string; name: string }>) => void;
}

const toItem = (f: IFilter): (ItemList & { _kid: string }) => ({
  id: String(f.id),
  value: f.description,
  obj: f,
  _kid: String(f.id).toLowerCase(),
});

const byValueAsc = (a: ItemList, b: ItemList) =>
  a.value.localeCompare(b.value, undefined, { sensitivity: 'base' });

export const DualProfileFetch: React.FC<DualProfileFetchProps> = ({
  selectedProfiles,
  selectedFilters,
  initialLeftProfiles,
  onChange,
  onChangeProfiles,
  remountKey,
}) => {
  const { getProfilesFilterProfiles } = useContext(DependencyContext);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const [leftApiItems, setLeftApiItems] = useState<(ItemList & { _kid: string })[]>([]);
  const [leftLoading, setLeftLoading] = useState(false);
  const [leftHasMore, setLeftHasMore] = useState(true);

  const restrictMode = initialLeftProfiles !== undefined;
  const restrictIds = useMemo(() => (initialLeftProfiles ?? []).map(p => String(p.id)), [initialLeftProfiles]);

  const selectedProfilesMap = useMemo(
    () => new Map((selectedProfiles ?? []).map(p => [String(p.id), p.name])),
    [selectedProfiles]
  );
  const seedNameMap = useMemo(
    () => new Map((initialLeftProfiles ?? []).map(p => [String(p.id), p.name])),
    [initialLeftProfiles]
  );
  
  const byId = useMemo(() => new Map(leftApiItems.map(i => [String(i.id), i])), [leftApiItems]);

  const getFromMapCI = (map: Map<string, string>, idStr: string) => {

    if (map.has(idStr)) return map.get(idStr)!;

    const hit = [...map.entries()].find(([k]) => k.toLowerCase() === idStr.toLowerCase());

    return hit?.[1];
  };

  const enrichRightItem = useCallback(
    (rawId: string | number): ItemList => {

      const idStr = String(rawId);
      const cached = byId.get(idStr);
      if (cached) return { id: idStr, value: cached.value, obj: cached.obj };

      const seedName = getFromMapCI(seedNameMap, idStr);
      if (seedName)
        return { id: idStr, value: seedName, obj: { id: rawId, name: seedName, description: seedName } as any };

      const selName = getFromMapCI(selectedProfilesMap, idStr);
      if (selName)
        return { id: idStr, value: selName, obj: { id: rawId, name: selName, description: selName } as any };

      return { id: idStr, value: idStr, obj: { id: rawId } as any };

    },
    [byId, seedNameMap, selectedProfilesMap]
  );

  const rightIds = useMemo(
    () => (selectedFilters !== undefined ? selectedFilters : (selectedProfiles ?? []).map(p => p.id)),
    [selectedFilters, selectedProfiles]
  );
  const rightIdSet = useMemo(() => new Set(rightIds.map(s => String(s).toLowerCase())), [rightIds]);

  const initRight: ItemList[] = useMemo(() => rightIds.map(enrichRightItem), [rightIds, enrichRightItem]);

  const abortRef = useRef<AbortController | null>(null);
  const seqRef = useRef(0);
  const spinnerTimerRef = useRef<number | null>(null);

  const beginSpinner = (mySeq: number) => {

    if (spinnerTimerRef.current) window.clearTimeout(spinnerTimerRef.current);

    spinnerTimerRef.current = window.setTimeout(() => {
      if (mySeq === seqRef.current) setLeftLoading(true);
    }, 120);

  };
  const endSpinner = () => {

    if (spinnerTimerRef.current) {
      window.clearTimeout(spinnerTimerRef.current);
      spinnerTimerRef.current = null;
    }
    setLeftLoading(false);

  };

  const fetchPage = async (pageArg: number, term: string, reset = false) => {
    
    if (restrictMode) return;

    const t = term?.trim() ?? '';

    const mySeq = ++seqRef.current;

   
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();

    abortRef.current = controller;

    beginSpinner(mySeq);

    try {

      const res = await getProfilesFilterProfiles.execute({
        filters: {
          page: pageArg,
          pageSize,
          search: t,
        }
      });

      if (mySeq !== seqRef.current) return; 

      const pageItems = (res ?? []).map(toItem);

      setLeftApiItems(prev => {

        const map = reset ? new Map<string, ItemList & { _kid: string }>() : new Map(prev.map(i => [String(i.id), i]));

        for (const it of pageItems) map.set(String(it.id), it);

        const merged = Array.from(map.values());

        merged.sort(byValueAsc); 

        return merged;
      });

      const len = Array.isArray(res) ? res.length : pageItems.length;

      setLeftHasMore(!restrictMode && len === pageSize);
      setPage(pageArg);

    } catch (err: any) {

    } finally {
      if (mySeq === seqRef.current) endSpinner();
    }
  };


  useEffect(() => {
    void fetchPage(1, '', true);
  }, [restrictMode]);


  const searchDebounceRef = useRef<number | null>(null);
  const clearSearchDebounce = () => {
    if (searchDebounceRef.current) {
      window.clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }
  };

  const handleLeftSearch = (term: string) => {
    if (restrictMode) return;
    clearSearchDebounce();
    const t = term ?? '';
    setQuery(t);
    searchDebounceRef.current = window.setTimeout(() => {
      void fetchPage(1, t, true);
    }, 200);
  };

  const handleLeftLoadMore = () => {
    if (restrictMode || leftLoading || !leftHasMore) return;
    void fetchPage(page + 1, query, false);
  };

  const initLeft: ItemList[] = useMemo(() => {
    const rightIdsLower = rightIdSet;

    if (!restrictMode) {
      const base = leftApiItems.filter(it => !rightIdsLower.has(String(it.id).toLowerCase()));
      return base.map(({ _kid, ...rest }) => rest);
    }

    if (restrictMode && (initialLeftProfiles?.length ?? 0) === 0) {
      return [];
    }

    const seeded = (initialLeftProfiles ?? [])
      .filter(p => !rightIdsLower.has(String(p.id).toLowerCase()))
      .map(p => enrichRightItem(p.id));

    const map = new Map<string, ItemList>();
    for (const it of seeded) map.set(String(it.id), it);
    return Array.from(map.values());
  }, [restrictMode, initialLeftProfiles, leftApiItems, rightIdSet, enrichRightItem]);

  const handleChangeRight = (selected: ItemList[]) => {
    const ids = selected.map(x => String((x as any).obj?.id ?? x.id));
    onChange(ids);
    if (onChangeProfiles) {
      const profs = selected.map(x => {
        const id = String((x as any).obj?.id ?? x.id);
        const name = String((x as any).obj?.name ?? x.value);
        return { id, name };
      });
      onChangeProfiles(profs);
    }
  };

  return (
    <CustomDualListFetch
      placeholder="Buscar perfil"
      initLeft={initLeft}
      initRight={initRight}
      titleLeft="Perfiles disponibles"
      titleRight="Perfiles asignados"
      handleChange={handleChangeRight}
      leftLoading={restrictMode ? false : leftLoading}
      leftHasMore={restrictMode ? false : leftHasMore}
      onLeftLoadMore={restrictMode ? undefined : handleLeftLoadMore}
      onLeftSearch={restrictMode ? undefined : handleLeftSearch}
      remountKey={remountKey}
      restrictLeftIds={restrictMode ? restrictIds : undefined}
    />
  );
};

export default DualProfileFetch;
