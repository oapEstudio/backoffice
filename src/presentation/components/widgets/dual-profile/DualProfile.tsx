
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import Loading from '../../ui/loading'
import type { ItemList } from '../../ui/dual-list/DualList'
import { CustomDualList } from '../custom-dual-list/CustomDualList'
import type { IFilter } from '../../../../domain/entities/IFilter'

export interface DualProfileProps {

  selectedFilters: string[] | undefined

  initialLeftIds?: string[] | undefined

  onChange: (newAssigned: string[]) => void
}

const key = (v: unknown) => String(v ?? '').toLowerCase()

export const DualProfile: React.FC<DualProfileProps> = ({
  selectedFilters,
  initialLeftIds,
  onChange,
}) => {
  const { getProfilesFilterProfiles } = useContext(DependencyContext)
  const [allFilters, setAllFilters] = useState<IFilter[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getProfilesFilterProfiles
      .execute()
      .then((res) => { if (mounted) setAllFilters(res) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [getProfilesFilterProfiles])

  
  const selectedSet = useMemo(() => {
    const list = (selectedFilters ?? []).map(key)
    return new Set(list)
  }, [selectedFilters])

  const seedSet = useMemo(() => {
    const list = (initialLeftIds ?? []).map(key)
    return new Set(list)
  }, [initialLeftIds])

  
  const allItems: (ItemList & { _k: string })[] = useMemo(
    () =>
      allFilters.map((g) => ({
        id: String(g.id),        
        value: g.description,    
        obj: g,                  
        _k: key(g.id),           
      })),
    [allFilters]
  )

  
  const initRight: ItemList[] = useMemo(
    () => allItems.filter((item) => selectedSet.has(item._k)),
    [allItems, selectedSet]
  )

  
  
  
  const initLeft: ItemList[] = useMemo(() => {
    if (seedSet.size > 0) {
      return allItems
        .filter((item) => seedSet.has(item._k) && !selectedSet.has(item._k))
        .map(({ _k, ...rest }) => rest)
    }
    return allItems
      .filter((item) => !selectedSet.has(item._k))
      .map(({ _k, ...rest }) => rest)
  }, [allItems, seedSet, selectedSet])

  
  const handleChangeRight = (selected: ItemList[]) => {
    onChange(selected.map((x) => String((x as any).obj?.id ?? x.id)))
  }

  if (loading) return <center><Loading /></center>

  return (
    <CustomDualList
      placeholder="Buscar perfil"
      initLeft={initLeft}
      initRight={initRight}
      titleLeft="Perfiles disponibles"
      titleRight="Perfiles asignados"
      handleChange={handleChangeRight}
    />
  )
}

export default DualProfile
