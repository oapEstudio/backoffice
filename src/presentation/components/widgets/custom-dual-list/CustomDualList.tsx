import React, { useState, useEffect, type ChangeEvent, useMemo, useRef } from 'react'
import { DualList, type ItemList } from '../../ui/dual-list/DualList'
import { CustomSearchInput } from '../../ui/inputs/search-inputs/search-input.component'
import { CustomStack } from '../../ui/stack/Stack'

export interface ICustomDualList {
  initLeft: ItemList[];
  initRight: ItemList[];
  titleLeft: string;
  titleRight: string;
  placeholder?: string;
  handleChange: (assignedValues: ItemList[]) => void;
}

const norm = (s: string) => s.toLowerCase().trim();
const idOf = (it: ItemList) => String(it.id);

export const CustomDualList: React.FC<ICustomDualList> = ({
  initLeft,
  initRight,
  titleLeft,
  titleRight,
  handleChange,
  placeholder
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [checked, setChecked] = useState<ItemList[]>([])

  /** Mantiene lo real */
  const [leftSrc, setLeftSrc] = useState<ItemList[]>(initLeft)
  const [rightSrc, setRightSrc] = useState<ItemList[]>(initRight)

  // Si llegan valores por default de afuera, inicia con estos datos
  useEffect(() => { setLeftSrc(initLeft) }, [initLeft])
  useEffect(() => { setRightSrc(initRight) }, [initRight])

  // Esto mantiene solo lo filtrado
  const filteredLeft  = useMemo(
    () => leftSrc.filter(item => norm(item.value).includes(norm(searchTerm))),
    [leftSrc, searchTerm]
  )
  const filteredRight = useMemo(
    () => rightSrc.filter(item => norm(item.value).includes(norm(searchTerm))),
    [rightSrc, searchTerm]
  )

  // Guardamos lo filtrado para realizar la accion de mover los elementos
  const prevFilteredLeftRef  = useRef<ItemList[]>(filteredLeft)
  const prevFilteredRightRef = useRef<ItemList[]>(filteredRight)

  useEffect(() => { prevFilteredLeftRef.current  = filteredLeft },  [filteredLeft])
  useEffect(() => { prevFilteredRightRef.current = filteredRight }, [filteredRight])

//Tomamos lo que se mantuvo en prevFilter
  const applyDelta = (
    newFilteredLeft: ItemList[] | null,
    newFilteredRight: ItemList[] | null
  ) => {
    // Usamos las listas filtradas previas para detectar qué se movió
    const prevFL = prevFilteredLeftRef.current
    const prevFR = prevFilteredRightRef.current

    // Mapitas por id para fácil el recorrido de las listas
    const leftMap  = new Map(leftSrc.map(it => [idOf(it), it]))
    const rightMap = new Map(rightSrc.map(it => [idOf(it), it]))

    let nextLeft  = leftSrc.slice()
    let nextRight = rightSrc.slice()

    //Agregamos y quitamos de las listas
    const removeFrom = (arr: ItemList[], ids: Set<string>) =>
      arr.filter(it => !ids.has(idOf(it)))
    const pickFrom = (map: Map<string, ItemList>, ids: Set<string>) =>
      Array.from(ids).map(id => map.get(id)).filter(Boolean) as ItemList[]

    // Si cambió la lista de la derecha
    if (newFilteredRight) {
      const prevIds = new Set(prevFR.map(idOf))
      const nextIds = new Set(newFilteredRight.map(idOf))

      // agregados a la derecha (estaban en vista previa izquierda y pasaron a derecha)
      const addedToRightIds = new Set([...nextIds].filter(id => !prevIds.has(id)))
      // sacamos de la derecha (volvieron a la izquierda)
      const removedFromRightIds = new Set([...prevIds].filter(id => !nextIds.has(id)))

      if (addedToRightIds.size > 0) {
        // mover desde leftSrc -> rightSrc
        const moved = pickFrom(leftMap, addedToRightIds)
        nextLeft  = removeFrom(nextLeft, addedToRightIds)
        nextRight = nextRight.concat(moved)
      }
      if (removedFromRightIds.size > 0) {
        // mover desde rightSrc -> leftSrc
        const moved = pickFrom(rightMap, removedFromRightIds)
        nextRight = removeFrom(nextRight, removedFromRightIds)
        nextLeft  = nextLeft.concat(moved)
      }
    }

    // Lo mismo que en la derecha 
    if (newFilteredLeft) {
      const prevIds = new Set(prevFL.map(idOf))
      const nextIds = new Set(newFilteredLeft.map(idOf))

     
      const removedFromLeftIds = new Set([...prevIds].filter(id => !nextIds.has(id)))
   
      const addedToLeftIds = new Set([...nextIds].filter(id => !prevIds.has(id)))

      if (removedFromLeftIds.size > 0) {
        const moved = pickFrom(leftMap, removedFromLeftIds)
        nextLeft  = removeFrom(nextLeft, removedFromLeftIds)
        nextRight = nextRight.concat(moved)
      }
      if (addedToLeftIds.size > 0) {
        const moved = pickFrom(rightMap, addedToLeftIds)
        nextRight = removeFrom(nextRight, addedToLeftIds)
        nextLeft  = nextLeft.concat(moved)
      }
    }

    // Actualizamos las listas que mantienen lo real
    setLeftSrc(nextLeft)
    setRightSrc(nextRight)
    handleChange(nextRight) 
  }

  // Lo que paso al dual list
  const setLeftView: React.Dispatch<React.SetStateAction<ItemList[]>> = (value) => {
    const nextView =
      typeof value === 'function'
        ? (value as (prev: ItemList[]) => ItemList[])(prevFilteredLeftRef.current)
        : value
    applyDelta(nextView, null)
  }

  const setRightView: React.Dispatch<React.SetStateAction<ItemList[]>> = (value) => {
    const nextView =
      typeof value === 'function'
        ? (value as (prev: ItemList[]) => ItemList[])(prevFilteredRightRef.current)
        : value
    applyDelta(null, nextView)
  }

  
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
  const onClearSearch = () => setSearchTerm('')

  return (
    <>
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
    </>
  )
}

export default CustomDualList
