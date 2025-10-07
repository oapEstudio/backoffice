import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import Loading from '../../ui/loading'
import type { ItemList } from '../../ui/dual-list/DualList'
import type { IFilter } from '../../../../domain/entities/IFilter'
import CustomDualListFetch from '../custom-dual-list-fetch/CustomDualListFetch'

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
})

export const DualProfileFetch: React.FC<DualProfileFetchProps> = ({
  selectedProfiles,
  selectedFilters,
  initialLeftProfiles,
  onChange,
  onChangeProfiles,
  remountKey
}) => {
  const { getProfilesFilterProfiles } = useContext(DependencyContext)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 50

  const [leftApiItems, setLeftApiItems] = useState<(ItemList & { _kid: string })[]>([])
  const [leftLoading, setLeftLoading] = useState(false)
  const [leftHasMore, setLeftHasMore] = useState(true)


  const restrictMode = initialLeftProfiles !== undefined
  const restrictIds = useMemo(
    () => (initialLeftProfiles ?? []).map(p => String(p.id)),
    [initialLeftProfiles]
  )

  const selectedProfilesMap = useMemo(
    () => new Map((selectedProfiles ?? []).map(p => [String(p.id), p.name])),
    [selectedProfiles]
  )
  const seedNameMap = useMemo(
    () => new Map((initialLeftProfiles ?? []).map(p => [String(p.id), p.name])),
    [initialLeftProfiles]
  )
  const byId = useMemo(
    () => new Map(leftApiItems.map(i => [String(i.id), i])),
    [leftApiItems]
  )

  const getFromMapCI = (map: Map<string, string>, idStr: string) => {
    if (map.has(idStr)) return map.get(idStr)!
    const hit = [...map.entries()].find(([k]) => k.toLowerCase() === idStr.toLowerCase())
    return hit?.[1]
  }

  
  const enrichRightItem = (rawId: string | number): ItemList => {
    const idStr = String(rawId)
    const cached = byId.get(idStr)
    if (cached) return { id: idStr, value: cached.value, obj: cached.obj }

    const seedName = getFromMapCI(seedNameMap, idStr)
    if (seedName) return { id: idStr, value: seedName, obj: { id: rawId, name: seedName, description: seedName } as any }

    const selName = getFromMapCI(selectedProfilesMap, idStr)
    if (selName) return { id: idStr, value: selName, obj: { id: rawId, name: selName, description: selName } as any }

    return { id: idStr, value: idStr, obj: { id: rawId } as any }
  }


  const rightIds = useMemo(
    () => (selectedFilters !== undefined ? selectedFilters : (selectedProfiles ?? []).map(p => p.id)),
    [selectedFilters, selectedProfiles]
  )
  const rightIdSet = useMemo(
    () => new Set(rightIds.map(s => String(s).toLowerCase())),
    [rightIds]
  )
  const initRight: ItemList[] = useMemo(
    () => rightIds.map(enrichRightItem),
    [rightIds, enrichRightItem]
  )


  const fetchPage = async (pageArg: number, term: string, reset = false) => {

    if (restrictMode) return;

    setLeftLoading(true);

    try {
      const res = await getProfilesFilterProfiles.execute({
        filters: {
          page: pageArg,
          pageSize,
          search: term && term.trim() ? term.trim() : '',
        },
      })
      const pageItems = (res ?? []).map(toItem)
      const existing = reset
        ? new Map<string, ItemList & { _kid: string }>()
        : new Map(leftApiItems.map(i => [String(i.id), i]))
      for (const it of pageItems) existing.set(String(it.id), it)
      const next = Array.from(existing.values())
      setLeftApiItems(next)

      const len = Array.isArray(res) ? res.length : pageItems.length
      setLeftHasMore(!restrictMode && len === pageSize)
      setPage(pageArg)
    } finally {
      setLeftLoading(false)
    }
  }

  useEffect(() => {
    void fetchPage(1, '', true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restrictMode])

  const handleLeftSearch = (term: string) => {
    if (restrictMode) return;
    setQuery(term)
    void fetchPage(1, term, true)
  }

  const handleLeftLoadMore = () => {
    if (restrictMode || leftLoading || !leftHasMore) return
    void fetchPage(page + 1, query, false)
  }


  const initLeft: ItemList[] = useMemo(() => {
    const rightIdsLower = rightIdSet


    if (!restrictMode) {
      const base = leftApiItems.filter(it => !rightIdsLower.has(String(it.id).toLowerCase()))
      return base.map(({ _kid, ...rest }) => rest)
    }


    if (restrictMode && (initialLeftProfiles?.length ?? 0) === 0) {
      return []
    }

    
    const seeded = (initialLeftProfiles ?? [])
      .filter(p => !rightIdsLower.has(String(p.id).toLowerCase()))
      .map(p => enrichRightItem(p.id))

    const map = new Map<string, ItemList>()
    for (const it of seeded) map.set(String(it.id), it)
    return Array.from(map.values())
  }, [restrictMode, initialLeftProfiles, leftApiItems, rightIdSet, enrichRightItem])

  const handleChangeRight = (selected: ItemList[]) => {
    const ids = selected.map(x => String((x as any).obj?.id ?? x.id))
    onChange(ids)
    if (onChangeProfiles) {
      const profs = selected.map(x => {
        const id = String((x as any).obj?.id ?? x.id)
        const name = String((x as any).obj?.name ?? x.value)
        return { id, name }
      })
      onChangeProfiles(profs)
    }
  }

  if (!restrictMode && !leftApiItems.length && leftLoading) return <center><Loading /></center>

  return (
    <CustomDualListFetch
      placeholder={'Buscar perfil'}
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
  )
}

export default DualProfileFetch
