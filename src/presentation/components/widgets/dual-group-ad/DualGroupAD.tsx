// src/presentation/features/profiles/components/DualGroupAD.tsx
import React, { useContext, useEffect, useState } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import Loading from '../../ui/loading'
import type { ItemList } from '../../ui/dual-list/DualList'
import { CustomDualList } from '../custom-dual-list/CustomDualList'
import type { IGroup } from '../../../../domain/entities/IGroup'

export interface DualGroupADProps {
  selectedGroups: IGroup[]

  onChange: (newAssigned: IGroup[]) => void
}

export const DualGroupAD: React.FC<DualGroupADProps> = ({
  selectedGroups,
  onChange
}) => {
  const { getGroups } = useContext(DependencyContext)
  const [allGroups, setAllGroups] = useState<IGroup[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGroups
      .execute({ page: 1, pageSize: 1000, sortBy: null, sortDescending: false })
      .then((res) => setAllGroups(res.data.map((x) => x)))
      .finally(() => setLoading(false))
  }, [getGroups])

  if (loading) return <center><Loading /></center>

  const allItems: ItemList[] = allGroups.map((g, i) => ({ id: i, value: g.name,obj: g }))

  const initRight = allItems.filter((item) =>
    selectedGroups.map(x=>x.name).includes(item.value)
  )
  const initLeft = allItems.filter(
    (item) => !selectedGroups.map(x=>x.name).includes(item.value)
  )

  const change = (selected: ItemList[])=>{
    onChange(selected.map(x=>({id: x.obj.id,description: x.obj.description,name: x.obj.name})));
  }
  return (
    <CustomDualList
      placeholder='Buscar grupo AD'
      initLeft={initLeft}
      initRight={initRight}
      titleLeft="Grupos AD disponibles"
      titleRight="Grupos AD asignados"    
      handleChange={change}
    />
  )
}

export default DualGroupAD
