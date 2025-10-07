import React, { useState, useEffect, type ChangeEvent, useMemo, useRef, useRef as useRefType } from 'react'
import { DualList, type ItemList } from '../../ui/dual-list/DualList'
import { CustomSearchInput } from '../../ui/inputs/search-inputs/search-input.component'
import { CustomStack } from '../../ui/stack/Stack'
import Button from '../../ui/button/button.component'
import { ArrowDownDobleIcon } from '../../ui/icons'
import { CustomBox } from '../../ui/box/CustomBox'

export interface ICustomDualList {
  initLeft: ItemList[];
  initRight: ItemList[];
  titleLeft: string;
  titleRight: string;
  placeholder?: string;
  leftLoading?: boolean;
  leftHasMore?: boolean;
  restrictLeftIds?: string[];
  remountKey?: string;

  handleChange: (assignedValues: ItemList[]) => void;
  onLeftLoadMore?: () => void;
  onLeftSearch?: (term: string) => void;
}

const norm = (s: string) => s.toLowerCase().trim();
const idOf = (it: ItemList) => String(it.id);

const DEBOUNCE_MS = 300;
const MIN_QUERY_LEN = 4;

export const CustomDualListFetch: React.FC<ICustomDualList> = ({
  initLeft,
  initRight,
  titleLeft,
  titleRight,
  handleChange,
  placeholder,
  leftLoading,
  leftHasMore,
  onLeftLoadMore,
  onLeftSearch,
  remountKey,
  restrictLeftIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checked, setChecked] = useState<ItemList[]>([]);

  const [leftSrc, setLeftSrc]   = useState<ItemList[]>(initLeft);
  const [rightSrc, setRightSrc] = useState<ItemList[]>(initRight);

  
  const firstMount = useRef(true);
  const prevRemountKey = useRef<string | undefined>(undefined);

  useEffect(() => {
    
    if (remountKey && remountKey !== prevRemountKey.current) {
      prevRemountKey.current = remountKey;
      firstMount.current = false;
      setRightSrc(initRight);
      return;
    }

    
    if (firstMount.current) {
      firstMount.current = false;
      setRightSrc(initRight);
      return;
    }

    
    setRightSrc(prev => {
      const map = new Map(prev.map(i => [idOf(i), i]));
      for (const it of initRight) map.set(idOf(it), it);
      return Array.from(map.values());
    });
  }, [initRight, remountKey]);

  
  useEffect(() => {
    const rightIds = new Set(rightSrc.map(idOf));
    setLeftSrc(initLeft.filter(i => !rightIds.has(idOf(i))));
  }, [initLeft, rightSrc]);

  
  const filteredLeft = useMemo(() => {
  if (onLeftSearch) return leftSrc;

  const term = norm(searchTerm);

  if (!term) return leftSrc;

  return leftSrc.filter(item => norm(item.value).includes(term));
  
}, [leftSrc, onLeftSearch, searchTerm]);

  
  const filteredRight = useMemo(
    () => rightSrc.filter(item => norm(item.value).includes(norm(searchTerm))),
    [rightSrc, searchTerm]
  );

  
  const prevFilteredLeftRef  = useRef<ItemList[]>(filteredLeft);
  const prevFilteredRightRef = useRef<ItemList[]>(filteredRight);

  useEffect(() => { prevFilteredLeftRef.current  = filteredLeft;  }, [filteredLeft]);
  useEffect(() => { prevFilteredRightRef.current = filteredRight; }, [filteredRight]);

  const restrictLeftSet = useMemo(
    () => (restrictLeftIds ? new Set(restrictLeftIds.map(String)) : undefined),
    [restrictLeftIds]
  );

  const allowToLeft = (items: ItemList[]) =>
    restrictLeftSet
      ? items.filter(it => restrictLeftSet.has(String(it.id)))
      : items;

  const applyDelta = (
    newFilteredLeft: ItemList[] | null,
    newFilteredRight: ItemList[] | null
  ) => {
    const prevFL = prevFilteredLeftRef.current;
    const prevFR = prevFilteredRightRef.current;

    const leftMap  = new Map(leftSrc.map(it => [idOf(it), it]));
    const rightMap = new Map(rightSrc.map(it => [idOf(it), it]));

    let nextLeft  = leftSrc.slice();
    let nextRight = rightSrc.slice();

    const removeFrom = (arr: ItemList[], ids: Set<string>) =>
      arr.filter(it => !ids.has(idOf(it)));

    const pickFrom = (map: Map<string, ItemList>, ids: Set<string>) =>
      Array.from(ids).map(id => map.get(id)).filter(Boolean) as ItemList[];

   if (newFilteredRight) {
      const prevIds = new Set(prevFR.map(idOf));
      const nextIds = new Set(newFilteredRight.map(idOf));
      const addedToRightIds     = new Set([...nextIds].filter(id => !prevIds.has(id)));
      const removedFromRightIds = new Set([...prevIds].filter(id => !nextIds.has(id)));

      if (addedToRightIds.size > 0) {
        const moved = pickFrom(leftMap, addedToRightIds);
        nextLeft  = removeFrom(nextLeft, addedToRightIds);
        nextRight = nextRight.concat(moved);
      }
      if (removedFromRightIds.size > 0) {
        const moved = pickFrom(rightMap, removedFromRightIds);
        nextRight = removeFrom(nextRight, removedFromRightIds);
        nextLeft  = nextLeft.concat(allowToLeft(moved)); 
      }
    }

    if (newFilteredLeft) {
      const prevIds = new Set(prevFL.map(idOf));
      const nextIds = new Set(newFilteredLeft.map(idOf));
      const removedFromLeftIds = new Set([...prevIds].filter(id => !nextIds.has(id)));
      const addedToLeftIds     = new Set([...nextIds].filter(id => !prevIds.has(id)));

      if (removedFromLeftIds.size > 0) {
        const moved = pickFrom(leftMap, removedFromLeftIds);
        nextLeft  = removeFrom(nextLeft, removedFromLeftIds);
        nextRight = nextRight.concat(moved);
      }
      if (addedToLeftIds.size > 0) {
        const moved = pickFrom(rightMap, addedToLeftIds);
        nextRight = removeFrom(nextRight, addedToLeftIds);
        nextLeft  = nextLeft.concat(allowToLeft(moved));
      }
    }

    setLeftSrc(nextLeft);
    setRightSrc(nextRight);
    handleChange(nextRight);
  };

  const setLeftView: React.Dispatch<React.SetStateAction<ItemList[]>> = (value) => {
    const nextView =
      typeof value === 'function'
        ? (value as (prev: ItemList[]) => ItemList[])(prevFilteredLeftRef.current)
        : value;
    applyDelta(nextView, null);
  };
  const setRightView: React.Dispatch<React.SetStateAction<ItemList[]>> = (value) => {
    const nextView =
      typeof value === 'function'
        ? (value as (prev: ItemList[]) => ItemList[])(prevFilteredRightRef.current)
        : value;
    applyDelta(null, nextView);
  };

  
  const [debounceId, setDebounceId] = useState<number | null>(null);
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!onLeftSearch) return;

    if (debounceId) window.clearTimeout(debounceId);
    const id = window.setTimeout(() => {
      const t = term.trim();
      if (t.length === 0 || t.length >= MIN_QUERY_LEN) {
        onLeftSearch(t);
      }
    }, DEBOUNCE_MS);
    setDebounceId(id);
  };

  const onClearSearch = () => {
    setSearchTerm('');
    if (onLeftSearch) onLeftSearch('');
  };

  return (
    <CustomBox sx={{ containerType: 'inline-size', containerName: 'dl' }}>
      <CustomStack direction="row" spacing={2} sx={{ mb: 2 }}>
        <CustomSearchInput
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          onClick={onClearSearch}
        />
      </CustomStack>

      <DualList
        checked={checked}
        setChecked={setChecked}
        left={filteredLeft}
        right={filteredRight}
        setLeft={setLeftView}
        setRight={setRightView}
        titleLeft={titleLeft}
        titleRight={titleRight}
      />

      {onLeftLoadMore && (
        <CustomStack 
        direction="row" 
        sx={{
            mt: 2,
            justifyContent: 'flex-start',
            marginLeft: '15rem',            
            '@container dl (max-width: 600px)': { marginLeft: '6rem' },
            '@container dl (max-width: 400px)': { marginLeft: '6rem' },
          }}>
          <Button
            icon={<ArrowDownDobleIcon />}
            style={{ backgroundColor: 'transparent' }}
            variant="secondary"
            title={leftLoading ? 'Cargando...' : leftHasMore ? 'Cargar más' : 'No hay más'}
            onClick={onLeftLoadMore}
            disabled={leftLoading || !leftHasMore}
          />
        </CustomStack>
      )}
    </CustomBox>
  );
};

export default CustomDualListFetch;
