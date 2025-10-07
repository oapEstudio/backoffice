import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { ItemList } from '../../ui/dual-list/DualList';
import type { IGroup } from '../../../../domain/entities/IGroup';
import CustomDualListFetch from '../custom-dual-list-fetch/CustomDualListFetch';

export interface DualGroupADProps {
  selectedGroups: IGroup[];
  onChange: (newAssigned: IGroup[]) => void;
  remountKey?: string;
}

const toItem = (g: IGroup): ItemList => ({
  id: String(g.id),
  value: g.name,
  obj: g,
});


const byValueAsc = (a: ItemList, b: ItemList) =>
  a.value.localeCompare(b.value, undefined, { sensitivity: 'base' });

export const DualGroupADFetch: React.FC<DualGroupADProps> = ({
  selectedGroups,
  onChange,
  remountKey,
}) => {
  const { getGroups } = useContext(DependencyContext);

  
  const initRight: ItemList[] = useMemo(() => selectedGroups.map(toItem), [selectedGroups]);
  const rightIds = useMemo(() => new Set(initRight.map(i => String(i.id))), [initRight]);

  
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const [leftApiItems, setLeftApiItems] = useState<ItemList[]>([]);
  const [leftLoading, setLeftLoading] = useState(false);
  const [leftHasMore, setLeftHasMore] = useState(true);


  const firstLoadDoneRef = useRef(false);


  const abortRef = useRef<AbortController | null>(null);
  const seqRef = useRef(0);
  const spinnerTimerRef = useRef<number | null>(null);


  const searchDebounceRef = useRef<number | null>(null);
  const clearSearchDebounce = () => {
    if (searchDebounceRef.current) {
      window.clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }
  };

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

  const fetchPage = async (pageArg: number, term: string, reset: boolean) => {
    const normalized = term.trim();
    const mySeq = ++seqRef.current;

 
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    beginSpinner(mySeq);

    try {
      const res = await getGroups.execute({
        page: pageArg,
        pageSize,
        sortBy: null,
        sortDescending: false,
        search: normalized || undefined,
       
      } as any);

      if (mySeq !== seqRef.current) return; 

      const pageItems: ItemList[] = (res?.data ?? []).map(toItem);

      setLeftApiItems(prev => {
        const map = reset
          ? new Map<string, ItemList>()
          : new Map(prev.map(i => [String(i.id), i]));
        for (const it of pageItems) map.set(String(it.id), it);
        const merged = Array.from(map.values());
        merged.sort(byValueAsc); 
        return merged;
      });

      setLeftHasMore((res?.data?.length ?? 0) === pageSize);
      setPage(pageArg);
      firstLoadDoneRef.current = true;
    } catch (err: any) {
      
    } finally {
      if (mySeq === seqRef.current) endSpinner();
    }
  };

  
  useEffect(() => {
    void fetchPage(1, '', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  
  const handleLeftSearch = (term: string) => {
    clearSearchDebounce();
    const t = term.trim();
    setQuery(t);
    searchDebounceRef.current = window.setTimeout(() => {
      void fetchPage(1, t, true);
    }, 200); 
  };

  const handleLeftLoadMore = () => {
    if (leftLoading || !leftHasMore) return;
    void fetchPage(page + 1, query, false);
  };

  
  const initLeft: ItemList[] = useMemo(
    () => leftApiItems.filter(i => !rightIds.has(String(i.id))),
    [leftApiItems, rightIds]
  );

  const change = (selected: ItemList[]) => {
    onChange(selected.map(x => x.obj as IGroup));
  };

 
  return (
    <CustomDualListFetch
      placeholder="Buscar grupo AD"
      initLeft={initLeft}
      initRight={initRight}
      titleLeft="Grupos AD disponibles"
      titleRight="Grupos AD asignados"
      handleChange={change}
      leftLoading={leftLoading}
      leftHasMore={leftHasMore}
      onLeftLoadMore={handleLeftLoadMore}
      onLeftSearch={handleLeftSearch}
      remountKey={remountKey}
    />
  );
};

export default DualGroupADFetch;
